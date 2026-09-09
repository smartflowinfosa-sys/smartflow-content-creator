import { adminSupabase, requireUser, sendApiError } from './_lib.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' });
  try {
    const user = await requireUser(req);
    const provider = String(req.body?.provider || '');
    if (!['tiktok', 'instagram'].includes(provider)) return res.status(400).json({ error: 'unsupported_provider' });
    const admin = adminSupabase();
    const { data: connection, error: fetchError } = await admin.from('social_connections').select('access_token').eq('user_id', user.id).eq('platform', provider).maybeSingle();
    if (fetchError) throw fetchError;
    if (provider === 'tiktok' && connection?.access_token) {
      try {
        await fetch('https://open.tiktokapis.com/v2/oauth/revoke/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Cache-Control': 'no-cache' }, body: new URLSearchParams({ client_key: process.env.TIKTOK_CLIENT_KEY || '', client_secret: process.env.TIKTOK_CLIENT_SECRET || '', token: connection.access_token }) });
      } catch (revokeError) {
        console.warn('TikTok revoke failed; removing the local connection anyway.', revokeError);
      }
    }
    const { error: deleteError } = await admin.from('social_connections').delete().eq('user_id', user.id).eq('platform', provider);
    if (deleteError) throw deleteError;
    return res.status(200).json({ disconnected: true });
  } catch (error) {
    return sendApiError(res, error);
  }
}

