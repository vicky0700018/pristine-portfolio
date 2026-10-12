// DEMO-ONLY client-side authentication.
// This is NOT secure and must never be used for production. The password is
// never written to storage — only a session flag is kept in sessionStorage.
const SESSION_KEY = "caspira_admin_session";
const DEMO_USER = "admin";
const DEMO_PASS = "CasPira@123";

export function login(username, password) {
  if (username.trim() === DEMO_USER && password === DEMO_PASS) {
    try { window.sessionStorage.setItem(SESSION_KEY, JSON.stringify({ user: DEMO_USER, at: Date.now() })); } catch { /* ignore */ }
    return true;
  }
  return false;
}

export function isLoggedIn() {
  try { return Boolean(window.sessionStorage.getItem(SESSION_KEY)); } catch { return false; }
}

export function logout() {
  try { window.sessionStorage.removeItem(SESSION_KEY); } catch { /* ignore */ }
}
