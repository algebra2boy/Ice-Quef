import SHA256 from 'crypto-js/sha256';

/**
 * Encrypt a password with SHA256
 * @param {string} password
 * @returns {string} The encrypted password
 */
async function encryptPassword(password) {
  const hashWordArray = SHA256(password);
  // hash to a hex string
  return hashWordArray.toString();
}

export default encryptPassword;
