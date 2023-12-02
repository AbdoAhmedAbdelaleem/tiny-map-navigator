import crypto from 'crypto';

export const authentication = (salt: string, password: string, hashKey: string): string => {
    const combinedData = Buffer.from([Buffer.from(salt), Buffer.from(password)].join('/'));
    const hmac = crypto.createHmac('sha256', combinedData);
    return hmac.update(hashKey).digest('hex');
  };

export const random = () => crypto.randomBytes(128).toString('base64');