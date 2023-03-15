import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { SequelizeModule } from '@nestjs/sequelize';

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
