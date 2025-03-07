export interface cookieOptions {
  name: string ,
  value?: string ,
  expires?: Date ,
  maxAge?: number ,
  domain?: string ,
  path?: string ,
  secure?: boolean ,
  httpOnly?: 	boolean ,
  sameSite?: boolean ,
  priority?: string  ,
  encode?: (value?:string)=> void ,
  partitioned?: boolean ,
}
