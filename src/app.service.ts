import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
    <div style="text-align: center; padding: 20px;">
      <h1 style="color: #4CAF50;">Welcome to My Application</h1>
      <p style="font-size: 18px;">Enjoy exploring the features!</p>
    </div>
  `;
  }
}
