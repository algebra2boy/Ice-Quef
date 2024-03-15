async function encryptPassword(password) {
    // string to an array buffer
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    // sha256
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);

    // array buffer to a hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

    return hashHex;
}
