import crypto from 'node:crypto';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://hjwbmmwrswvaohrmkqpt.supabase.co';
const SUPABASE_PUBLIC_KEY = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY;
const SUPABASE_SERVER_KEY = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
export const APP_URL = (process.env.APP_URL || 'https://www.smartflowsys.com').replace(/\/$/, '');

function requireEnv(value, name) {
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

export function publicSupabase() {
  return createClient(SUPABASE_URL, requireEnv(SUPABASE_PUBLIC_KEY, 'SUPABASE_PUBLISHABLE_KEY'), { auth: { persistSession: false, autoRefreshToken: false } });
}

export function adminSupabase() {
  return createClient(SUPABASE_URL, requireEnv(SUPABASE_SERVER_KEY, 'SUPABASE_SECRET_KEY'), { auth: { persistSession: false, autoRefreshToken: false } });
}

export async function requireUser(req) {
  const authorization = req.headers.authorization || '';
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
  if (!token) {
    const error = new Error('Authentication required');
    error.statusCode = 401;
    throw error;
  }
  const { data, error } = await publicSupabase().auth.getUser(token);
  if (error || !data.user) {
    const authError = new Error('Invalid or expired session');
    authError.statusCode = 401;
    throw authError;
  }
  return data.user;
}

function stateSecret() {
  return requireEnv(process.env.OAUTH_STATE_SECRET || SUPABASE_SERVER_KEY, 'OAUTH_STATE_SECRET');
}

export function createOAuthState(userId, provider) {
  const payload = Buffer.from(JSON.stringify({ userId, provider, nonce: crypto.randomBytes(18).toString('base64url'), expiresAt: Date.now() + 10 * 60 * 1000 })).toString('base64url');
  const signature = crypto.createHmac('sha256', stateSecret()).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

export function verifyOAuthState(state, provider) {
  if (typeof state !== 'string') throw new Error('Missing OAuth state');
  const [payload, signature] = state.split('.');
  if (!payload || !signature) throw new Error('Invalid OAuth state');
  const expected = crypto.createHmac('sha256', stateSecret()).update(payload).digest();
  const received = Buffer.from(signature, 'base64url');
  if (received.length !== expected.length || !crypto.timingSafeEqual(received, expected)) throw new Error('Invalid OAuth state signature');
  const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
  if (decoded.provider !== provider || decoded.expiresAt < Date.now() || !decoded.userId) throw new Error('Expired or invalid OAuth state');
  return decoded;
}

export function redirectToApp(res, provider, connected, error) {
  const url = new URL(APP_URL);
  url.searchParams.set('oauth_provider', provider);
  url.searchParams.set('oauth_connected', connected ? 'true' : 'false');
  if (error) url.searchParams.set('oauth_error', error);
  return res.redirect(302, url.toString());
}

export function sendApiError(res, error) {
  console.error(error);
  const status = error.statusCode || 500;
  return res.status(status).json({ error: status === 500 ? 'server_error' : error.message });
}

export async function saveConnection(connection) {
  const { error } = await adminSupabase().from('social_connections').upsert({ ...connection, status: 'connected', last_error: null, disconnected_at: null, updated_at: new Date().toISOString() }, { onConflict: 'user_id,platform' });
  if (error) throw error;
}

