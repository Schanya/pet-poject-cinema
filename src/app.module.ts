import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { CoreModule } from './core/core.module';
import { AllExceptionsFilter } from './core/helpers/filters';
import { join } from 'path';

import { DatabaseModule } from './database/database.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
	imports: [
		DatabaseModule,
		CoreModule,
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'public'),
		}),
	],
	controllers: [],
	providers: [
		{
			provide: APP_FILTER,
			useClass: AllExceptionsFilter,
		},
	],
})
export class AppModule {}
