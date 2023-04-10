export enum TYPE_TRANSACTION {
  DOMESTIC = 'domestic',
  INTERNATIONAL = 'international',
}

export enum USER_ROLE {
  ADMIN = '1',
  MANAGER = '2',
  USER = '3',
}

export enum USER_PERMISSION {
  VIEW = 'VIEW',
  EDIT = 'EDIT',
}

export enum PREFIX_LOCALE {
  EN = 'en',
  ZH = 'zh',
}

export enum ERROR_CODE {
  TIME_OUT = 'timeout',
  NOT_AUTHORIZE = 'authentication.notAuthorize',
}

export enum ContentType {
  JSON = 'application/json',
  MULTIPART = 'multipart/form-data',
}