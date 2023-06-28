const crypto = require('crypto');
/*
const algorithm = 'aes-256-ctr';
const encryptionKey = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
*/
const algorithm = 'aes-256-cbc';
const key = crypto.createHash('sha256').update('votre_clé_secrète').digest('base64').slice(0, 32);
const iv = crypto.randomBytes(16); 




// Fonction de chiffrement
function encryptConversationId(conversationId) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(conversationId.toString(), 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// Fonction de décryptage
function decryptConversationId(encryptedConversationId) {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedConversationId, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}


module.exports = { encryptConversationId, decryptConversationId };