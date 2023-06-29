const crypto = require('crypto');
/*
const algorithm = 'aes-256-ctr';
const encryptionKey = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
*/
const algorithm = 'aes-256-cbc';
const key = crypto.createHash('sha256').update(process.env.secretKey).digest('base64').slice(0, 32);
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

function encryptMessage(message) {
  const ivmessage = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, ivmessage);
  let encrypted = cipher.update(message, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return {
    encryptedMessage: encrypted,
    iv: ivmessage.toString('hex')
  };
}

// Fonction de déchiffrement d'un message
function decryptMessage(encryptedMessage, ivmessage) {
  if (ivmessage === "") {
    return encryptedMessage;
  }
  const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(ivmessage,'hex'));
  let decrypted = decipher.update(encryptedMessage, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

module.exports = { encryptConversationId, decryptConversationId, encryptMessage, decryptMessage };