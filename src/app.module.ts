import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

const MONGO_CONNECTION =
  'mongodb+srv://nikolay_l:qwerqweruiop123@nestcluster.nowi2.mongodb.net/?retryWrites=true&w=majority';

@Module({
  imports: [MongooseModule.forRoot(MONGO_CONNECTION), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
