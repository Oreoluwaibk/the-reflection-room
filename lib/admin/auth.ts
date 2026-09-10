import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "trr_admin_session";
const SESSION_DAYS = 14;

function getAdminCredentials() {
  const username = process.env.ADMIN_USERNAME?.trim() ?? "";
  const password = process.env.ADMIN_PASSWORD ?? "";
  const secret = process.env.ADMIN_SESSION_SECRET?.trim() ?? "";
  return { username, password, secret };
}

export function isAdminAuthConfigured() {
  const { username, password, secret } = getAdminCredentials();
  return Boolean(username && password && secret);
}

function sign(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function createSessionToken(username: string, secret: string) {
  const exp = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  const payload = Buffer.from(JSON.stringify({ u: username, exp })).toString(
    "base64url",
  );
  return `${payload}.${sign(payload, secret)}`;
}

function verifySessionToken(token: string, secret: string, username: string) {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expected = sign(payload, secret);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;

  try {
    const data = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as { u?: string; exp?: number };
    if (data.u !== username) return false;
    if (typeof data.exp !== "number" || data.exp < Date.now()) return false;
    return true;
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated() {
  if (!isAdminAuthConfigured()) return false;
  const { username, secret } = getAdminCredentials();
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifySessionToken(token, secret, username);
}

export function verifyAdminLogin(username: string, password: string) {
  if (!isAdminAuthConfigured()) {
    return {
      ok: false as const,
      message: "Admin login is not configured. Add ADMIN_USERNAME, ADMIN_PASSWORD, and ADMIN_SESSION_SECRET to .env.",
    };
  }

  const creds = getAdminCredentials();
  const userOk =
    username.length === creds.username.length &&
    timingSafeEqual(Buffer.from(username), Buffer.from(creds.username));
  const passOk =
    password.length === creds.password.length &&
    timingSafeEqual(Buffer.from(password), Buffer.from(creds.password));

  if (!userOk || !passOk) {
    return { ok: false as const, message: "Incorrect username or password." };
  }

  return { ok: true as const, token: createSessionToken(creds.username, creds.secret) };
}

export async function setAdminSession(token: string) {
  const jar = await cookies();
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export async function clearAdminSession() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}
