import { APP_URL, redirectToApp, saveConnection, verifyOAuthState } from '../_lib.js';

export default async function handler(req, res) {
  const { code, state, error } = req.query;
  if (error) return redirectToApp(res, 'instagram', false, String(error));
  if (!code) return redirectToApp(res, 'instagram', false, 'missing_code');
  try {
    const { userId } = verifyOAuthState(state, 'instagram');
    const redirectUri = `${APP_URL}/api/auth/instagram/callback`;
    const tokenResponse = await fetch('https://api.instagram.com/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ client_id: process.env.INSTAGRAM_CLIENT_KEY || '', client_secret: process.env.INSTAGRAM_CLIENT_SECRET || '', grant_type: 'authorization_code', redirect_uri: redirectUri, code: String(code) }),
    });
    const shortLived = await tokenResponse.json();
    if (!tokenResponse.ok || !shortLived.access_token) throw new Error(`Instagram token exchange failed: ${JSON.stringify(shortLived)}`);

    const longLivedUrl = new URL('https://graph.instagram.com/access_token');
    longLivedUrl.search = new URLSearchParams({ grant_type: 'ig_exchange_token', client_secret: process.env.INSTAGRAM_CLIENT_SECRET || '', access_token: shortLived.access_token }).toString();
    const longLivedResponse = await fetch(longLivedUrl);
    const longLived = await longLivedResponse.json();
    const accessToken = longLived.access_token || shortLived.access_token;
    const expiresIn = longLived.expires_in || 3600;

    const profileUrl = new URL('https://graph.instagram.com/me');
    profileUrl.search = new URLSearchParams({ fields: 'user_id,username,name,profile_picture_url', access_token: accessToken }).toString();
    const profileResponse = await fetch(profileUrl);
    const profile = await profileResponse.json();
    if (!profileResponse.ok || profile.error) throw new Error(`Instagram profile request failed: ${JSON.stringify(profile)}`);

    await saveConnection({
      user_id: userId,
      platform: 'instagram',
      provider_account_id: String(profile.user_id || profile.id || shortLived.user_id || ''),
      username: profile.username || profile.name || 'instagram_user',
      avatar_url: profile.profile_picture_url || '',
      access_token: accessToken,
      refresh_token: null,
      scope: 'instagram_business_basic,instagram_business_content_publish',
      expires_at: new Date(Date.now() + expiresIn * 1000).toISOString(),
      refresh_expires_at: null,
    });
    return redirectToApp(res, 'instagram', true);
  } catch (oauthError) {
    console.error('Instagram OAuth error:', oauthError);
    return redirectToApp(res, 'instagram', false, 'oauth_failed');
  }
}
