// src/helpers.js

export function isLink(val) {
  try {
    new URL(val);
    return true;
  } catch (_) {
    return false;
  }
}
