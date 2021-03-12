import * as cryptoTS from 'crypto-ts';

const { SECRET } = process.env;

const encrypt = (message: string): string => {
  return cryptoTS.AES.encrypt(message, SECRET!).toString();
};

const decrypt = (message: string): string => {
  return cryptoTS.AES.decrypt(message, SECRET!).toString(cryptoTS.enc.Utf8);
};

export { encrypt, decrypt };
