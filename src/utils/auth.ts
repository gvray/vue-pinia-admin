import storetify from "storetify";

const TokenKey = "Admin-Token";

export function getToken() {
  return storetify(TokenKey);
}

export function setToken(token: string) {
  return storetify(TokenKey, token);
}

export function removeToken() {
  return storetify.remove(TokenKey);
}
