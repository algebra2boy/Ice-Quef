import SHA256 from 'crypto-js/sha256';

async function encryptPassword(password) {
    const hashWordArray = SHA256(password);
     // hash to a hex string
    return hashWordArray.toString();
}

export default encryptPassword;
