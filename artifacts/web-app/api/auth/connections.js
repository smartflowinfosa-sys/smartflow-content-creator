import { adminSupabase, requireUser, sendApiError } from './_lib.js';

async function refreshIfNeeded(admin, connection) {
  const expiresAt = connection.expires_at ? new Date(connection.expires_at).getTime() : 0;
  const refreshWindow = connection.platform === 'instagram' ? 7 * 24 * 60 * 60 * 1000 : 10 * 60 * 1000;
  if (!expiresAt || expiresAt - Date.now() > refreshWindow) return connection;

  try {
    let refreshed;
    if (connection.platform === 'tiktok' && connection.refresh_token) {
      const response = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Cache-Control': 'no-cache' },
        body: new URLSearchParams({
          client_key: process.env.TIKTOK_CLIENT_KEY || '',
          client_secret: process.env.TIKTOK_CLIENT_SECRET || '',
          grant_type: 'refresh_token',
          refresh_token: connection.refresh_token,
        }),
      });
      const token = await response.json();
      if (!response.ok || !token.access_token) throw new Error(`TikTok refresh failed: ${JSON.stringify(token)}`);
      const now = Date.now();
      refreshed = {
        access_token: token.access_token,
        refresh_token: token.refresh_token || connection.refresh_token,
        scope: token.scope || connection.scope,
        expires_at: new Date(now + token.expires_in * 1000).toISOString(),
        refresh_expires_at: token.refresh_expires_in ? new Date(now + token.refresh_expires_in * 1000).toISOString() : connection.refresh_expires_at,
      };
    } else if (connection.platform === 'instagram') {
      const url = new URL('https://graph.instagram.com/refresh_access_token');
      url.search = new URLSearchParams({ grant_type: 'ig_refresh_token', access_token: connection.access_token }).toString();
      const response = await fetch(url);
      const token = await response.json();
      if (!response.ok || !token.access_token) throw new Error(`Instagram refresh failed: ${JSON.stringify(token)}`);
      refreshed = { access_token: token.access_token, expires_at: new Date(Date.now() + token.expires_in * 1000).toISOString() };
    } else {
      return connection;
    }

    const { data, error } = await admin.from('social_connections').update({ ...refreshed, last_error: null, status: 'connected', updated_at: new Date().toISOString() }).eq('id', connection.id).select().single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Could not refresh ${connection.platform} connection`, error);
    await admin.from('social_connections').update({ last_error: String(error.message || error), updated_at: new Date().toISOString() }).eq('id', connection.id);
    return connection;
  }
}

function publicConnection(connection) {
  const { platform, provider_account_id, username, avatar_url, scope, status, expires_at, refresh_expires_at, updated_at } = connection;
  return { platform, provider_account_id, username, avatar_url, scope, status, expires_at, refresh_expires_at, updated_at };
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'method_not_allowed' });
  try {
    const user = await requireUser(req);
    const admin = adminSupabase();
    const { data, error } = await admin.from('social_connections').select('*').eq('user_id', user.id).is('disconnected_at', null);
    if (error) throw error;
    const refreshed = await Promise.all((data || []).map((connection) => refreshIfNeeded(admin, connection)));
    return res.status(200).json({ connections: refreshed.map(publicConnection) });
  } catch (error) {
    return sendApiError(res, error);
  }
}
