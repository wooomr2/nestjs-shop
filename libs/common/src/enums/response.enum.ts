export enum ResCode {
  OK = 'OK',

  NOT_FOUND_ITEM = 'NOT_FOUND_ITEM',

  EMAIL_EXISTS = 'EMAIL_EXISTS',
  INVALID_USER = 'INVALID_USER',
  INVALID_PASSWORD = 'INVALID_PASSWORD',
  ACCESS_DENIED = 'ACCESS_DENIED',

  PRODUCT_IN_USE = 'PRODUCT_IN_USE',
  OUT_OF_STOCK = 'OUT_OF_STOCK',

  REVIEW_EXISTS = 'REVIEW_EXISTS',

  INVALID_ORDER_STATUS = 'INVALID_ORDER_STATUS',
}

export enum ResMessage {
  OK = 'OK',

  NOT_FOUND_ITEM = 'not found',

  EMAIL_EXISTS = 'email exists',
  INVALID_USER = 'invalid user',
  INVALID_PASSWORD = 'invalid password',
  ACCESS_DENIED = 'access denied',

  PRODUCT_IN_USE = 'product is in use',
  OUT_OF_STOCK = 'out of stock',

  REVIEW_EXISTS = 'already reviewed this product',

  INVALID_ORDER_STATUS = 'invalid order. Order already status',
}
