import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalModule } from './global/global.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
// import { GlobalExceptionFilter } from './global/globalExceptionFilter';
import { ProjectModule } from './project/project.module';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    GlobalModule,
    UserModule,
    AuthModule,
    EmailModule,
    ProjectModule,
    RedisModule.forRootAsync({
      useFactory: () => ({
        type: 'single',
        url: process.env.REDIS_URL,
        options: {
          password: process.env.REDIS_PASSWORD,
        },
      }),
    }),
  ],
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
