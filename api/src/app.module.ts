import { Module,MulterModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BackofficeModule } from './backoffice/backoffice.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.CONNECTION_STRING),
    BackofficeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
