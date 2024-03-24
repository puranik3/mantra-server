import { Module, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import mongoose from 'mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ProductsModule } from 'src/products/products.module';
import { AdminModule } from 'src/admin/admin.module';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

import authConfig from '@/config/auth';
import databaseConfig from '@/config/database';
import serverConfig from '@/config/server';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
      // ignoreEnvFile: true,
      isGlobal: true,
      load: [authConfig, databaseConfig, serverConfig],
    }),
    MongooseModule.forRootAsync({
      useFactory() {
        // global configurations for queries
        mongoose.set('returnOriginal', false);
        mongoose.set('runValidators', true);

        // const dbHost = this.configService.get('database.host');
        // const dbPassword = this.configService.get('database.password');
        // const dbName = this.configService.get('database.name');

        const uri =
          process.env.NODE_ENV === 'development'
            ? `mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`
            : process.env.DATABASE_CONNECTION_STRING;

        return {
          uri,
          // useNewUrlParser: true,
          // useUnifiedTopology: true,
        };
      },
    }),
    ProductsModule,
    UsersModule,
    AuthModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {
  constructor(private configService: ConfigService) {}
}
