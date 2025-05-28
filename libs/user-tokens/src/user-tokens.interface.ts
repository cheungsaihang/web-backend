export interface AccessTokenPayload{
  userId:string;
  email:string;
}

export interface AccessTokenDecodedPayload extends AccessTokenPayload {
  createdAt: Date;
  iat:number;
  exp:number;
}
