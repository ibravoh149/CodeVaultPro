import { Injectable } from '@nestjs/common';

@Injectable()
export class SnippetService {
  test() {
    console.log('runing here');
  }
}
