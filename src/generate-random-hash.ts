import * as crypto from 'crypto';

export const generateRandomHash = (length: number) =>
    crypto.randomBytes(Math.ceil(length / 2)).toString('hex');