import { APP_URL, createOAuthState, requireUser, sendApiError } from './_lib.js';

const PROVIDERS = {
  tiktok: {
    clientId: () => process.env.TIKTOK_CLIENT_KEY,
    redirectPath: '/api/auth/tiktok/callback',
    buildUrl(clientId, redirectUri, state) {
      const url = new URL('https://www.tiktok.com/v2/auth/authorize/');
      url.search = new URLSearchParams({ client_key: clientId, response_type: 'code', scope: 'user.info.basic,video.publish', redirect_uri: redirectUri, state }).toString();
      return url.toString();
    },
  },
  instagram: {
    clientId: () => process.env.INSTAGRAM_CLIENT_KEY,
    redirectPath: '/api/auth/instagram/callback',
    buildUrl(clientId, redirectUri, state) {
      const url = new URL('https://www.instagram.com/oauth/authorize');
      url.search = new URLSearchParams({ client_id: clientId, redirect_uri: redirectUri, response_type: 'code', scope: 'instagram_business_basic,instagram_business_content_publish', state }).toString();
      return url.toString();
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' });
  try {
    const providerName = String(req.query.provider || '');
    const provider = PROVIDERS[providerName];
    if (!provider) return res.status(400).json({ error: 'unsupported_provider' });
    const user = await requireUser(req);
    const clientId = provider.clientId();
    if (!clientId) throw new Error(`Missing ${providerName.toUpperCase()} client key`);
    const redirectUri = `${APP_URL}${provider.redirectPath}`;
    const state = createOAuthState(user.id, providerName);
    return res.status(200).json({ authorizationUrl: provider.buildUrl(clientId, redirectUri, state) });
  } catch (error) {
    return sendApiError(res, error);
  }
}

