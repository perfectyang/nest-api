import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalModule } from './global/global.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
// import { GlobalExceptionFilter } from './global/globalExceptionFilter';

@Module({
  imports: [GlobalModule, UserModule, AuthModule, EmailModule],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: GlobalExceptionFilter,
    // },
  ],
})
export class AppModule {}
