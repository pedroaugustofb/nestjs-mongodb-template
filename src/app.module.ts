import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infra/mongoose/database.module';
import UsersModule from './modules/users/users.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorsInterceptor } from './infra/interceptors/ErrorsInteceptor';
import AuthMiddleware from './modules/auth/auth.middleware';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }), DatabaseModule, AuthModule, UsersModule],
  controllers: [],
  providers: [{ provide: APP_INTERCEPTOR, useClass: ErrorsInterceptor }],
})
// Here we are using the NestModule interface to configure the middleware.
// for example an AuthMiddleware that will be used in all routes except the login and register routes.
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'auth/login', method: RequestMethod.POST }, { path: 'users', method: RequestMethod.POST })
      .forRoutes('*');
  }
}
