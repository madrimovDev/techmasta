import { Injectable } from '@nestjs/common';
import { ConfigService as Service } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private readonly configService: Service) {}

  get port() {
    return this.configService.get<string>('PORT');
  }
}
