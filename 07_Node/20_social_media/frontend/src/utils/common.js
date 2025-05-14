function decodeJWT(token) {
  if (!token) return null;

  try {
    // Split the token into parts (header.payload.signature)
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    // Base64 decode the payload (second part)
    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch (error) {
    // console.error('Error decoding JWT:', error);
    return null;
  }
}

export { decodeJWT }