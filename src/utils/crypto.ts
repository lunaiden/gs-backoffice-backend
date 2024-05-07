import { createCipheriv, createDecipheriv } from 'crypto';

const iv = Buffer.from(process.env.ENCRYPTION_IV, 'hex');
const key = process.env.ENCRYPTION_KEY;

export const encrypt = (data) => {
  const cipher = createCipheriv('aes-256-ctr', key, iv);
  const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);

  // convert to hex for inclusion in a url
  return encrypted.toString('hex');
};

export const decrypt = (data) => {
  // convert hex data to a buffer for decryption
  const dataBuffer = Buffer.from(data, 'hex');

  const decipher = createDecipheriv('aes-256-ctr', key, iv);
  return Buffer.concat([decipher.update(dataBuffer), decipher.final()]);
};
