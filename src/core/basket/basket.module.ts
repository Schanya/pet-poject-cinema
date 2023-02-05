import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { forwardRef } from '@nestjs/common/utils';

import { AuthModule } from '../auth/auth.module';

import { Basket } from './domain/basket.entity';
import { BasketService } from './domain/basket.service';

@Module({
	imports: [SequelizeModule.forFeature([Basket]), forwardRef(() => AuthModule)],
	controllers: [],
	providers: [BasketService],
	exports: [BasketService],
})
export class BasketModule {}
