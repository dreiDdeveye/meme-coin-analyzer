export const ADMIN_CREDENTIALS = {
  username: "oraclelabratory",
  password: "oraclelabratory26",
}

export function validateAdminCredentials(username: string, password: string): boolean {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password
}

export function setAdminSession() {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("oracle_admin_auth", "true")
  }
}

export function clearAdminSession() {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("oracle_admin_auth")
  }
}

export function isAdminAuthenticated(): boolean {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem("oracle_admin_auth") === "true"
  }
  return false
}
