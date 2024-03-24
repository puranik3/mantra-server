import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from '@/users/users.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import authConfig from '@/config/auth';

@Module({
  imports: [
    UsersModule,
    // @todo - This is effed up. forFeature() should be used but it is causing issues - this works but is not right!
    ConfigModule.forRoot({
      // envFilePath: '.env.production',
      // ignoreEnvFile: true,
      // isGlobal: true,
      load: [authConfig],
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '7 days' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
