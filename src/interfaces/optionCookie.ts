export interface OptionCookie {
  path?: string;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: string;
  maxAge?: number;
  expires?: Date;
}
