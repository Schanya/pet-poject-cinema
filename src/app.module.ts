import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { CoreModule } from './core/core.module';
import { AllExceptionsFilter } from './core/helpers/filters';
import { DatabaseModule } from './database/database.module';

@Module({
	imports: [DatabaseModule, CoreModule],
	controllers: [],
	providers: [
		{
			provide: APP_FILTER,
			useClass: AllExceptionsFilter,
		},
	],
})
export class AppModule {}
