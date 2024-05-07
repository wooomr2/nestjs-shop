export enum ResMessage {
  OK = 'OK',

  // Common
  NOT_FOUND = 'not found',

  // Auth
  EMAIL_EXISTS = 'email exists',
  INVALID_USER = 'invalid user',
  INVALID_PASSWORD = 'invalid password',
  ACCESS_DENIED = 'access denied',
}

export enum ResCode {
  OK = 0,

  // Common
  NOT_FOUND = 10000,

  // Auth
  EMAIL_EXISTS = 11000,
  INVALID_USER = 11001,
  INVALID_PASSWORD = 11002,
  ACCESS_DENIED = 11003,
}
