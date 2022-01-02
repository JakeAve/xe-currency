import crypto from 'crypto';

const randomID = (): string => crypto.randomBytes(16).toString('hex');

export default randomID;
