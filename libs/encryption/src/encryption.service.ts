import { Injectable } from '@nestjs/common';

@Injectable()
export class EncryptionService {
  private bcrypt;

  constructor(){
    this.bcrypt = require('bcrypt');
  }
  async hash(content:string){
    return await this.bcrypt.hash(content,10);
  }
  async compare(plainText:string,hash:string){
    return await this.bcrypt.compare(plainText, hash);
  }
}
