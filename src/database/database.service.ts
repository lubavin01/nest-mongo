import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class DatabaseService {
  constructor(@InjectConnection() private connection: Connection) {}

  getDbConnection(): Connection {
    return this.connection;
  }
}
