import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'now what next';
  }
  getHell(): string {
    return 'Hello!';
    
  }


}
