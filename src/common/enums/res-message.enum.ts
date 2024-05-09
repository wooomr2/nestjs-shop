export enum ResMessage {
  OK = 'OK',

  // Common
  NOT_FOUND_ITEM = 'not found',

  // Auth
  EMAIL_EXISTS = 'email exists',
  INVALID_USER = 'invalid user',
  INVALID_PASSWORD = 'invalid password',
  ACCESS_DENIED = 'access denied',

  // Product
  PRODUCT_IN_USE = 'product is in use',
  OUT_OF_STOCK = 'out of stock',

  REVIEW_EXISTS = 'already reviewed this product',

  INVALID_ORDER_STATUS = 'invalid order. Order already status',
}

export enum ResCode {
  OK = 0,

  NOT_FOUND_ITEM = 10000,

  EMAIL_EXISTS = 11000,
  INVALID_USER = 11001,
  INVALID_PASSWORD = 11002,
  ACCESS_DENIED = 11003,

  PRODUCT_IN_USE = 12000,
  OUT_OF_STOCK = 12002,

  REVIEW_EXISTS = 13001,

  INVALID_ORDER_STATUS = 14000,
}
