import { APP_URL, redirectToApp, saveConnection, verifyOAuthState } from '../_lib.js';

export default async function handler(req, res) {
  const { code, state, error } = req.query;
  if (error) return redirectToApp(res, 'tiktok', false, String(error));
  if (!code) return redirectToApp(res, 'tiktok', false, 'missing_code');
  try {
    const { userId } = verifyOAuthState(state, 'tiktok');
    const redirectUri = `${APP_URL}/api/auth/tiktok/callback`;
    const tokenResponse = await fetch('https://open.tiktokapis.com/v2/oauth/token/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Cache-Control': 'no-cache' }, body: new URLSearchParams({ client_key: process.env.TIKTOK_CLIENT_KEY || '', client_secret: process.env.TIKTOK_CLIENT_SECRET || '', code: String(code), grant_type: 'authorization_code', redirect_uri: redirectUri }) });
    const token = await tokenResponse.json();
    if (!tokenResponse.ok || !token.access_token) throw new Error(`TikTok token exchange failed: ${JSON.stringify(token)}`);
    const profileResponse = await fetch('https://open.tiktokapis.com/v2/user/info/?fields=open_id,union_id,avatar_url,display_name', { headers: { Authorization: `Bearer ${token.access_token}` } });
    const profile = await profileResponse.json();
    if (!profileResponse.ok || profile?.error?.code !== 'ok') throw new Error(`TikTok profile request failed: ${JSON.stringify(profile)}`);
    const account = profile.data.user;
    const now = Date.now();
    await saveConnection({ user_id: userId, platform: 'tiktok', provider_account_id: token.open_id || account.open_id, username: account.display_name || '@tiktok_user', avatar_url: account.avatar_url || '', access_token: token.access_token, refresh_token: token.refresh_token || null, scope: token.scope || '', expires_at: token.expires_in ? new Date(now + token.expires_in * 1000).toISOString() : null, refresh_expires_at: token.refresh_expires_in ? new Date(now + token.refresh_expires_in * 1000).toISOString() : null });
    return redirectToApp(res, 'tiktok', true);
  } catch (oauthError) {
    console.error('TikTok OAuth error:', oauthError);
    return redirectToApp(res, 'tiktok', false, 'oauth_failed');
  }
}

