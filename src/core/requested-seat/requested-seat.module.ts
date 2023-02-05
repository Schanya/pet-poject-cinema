import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { forwardRef } from '@nestjs/common/utils';

import { AuthModule } from '../auth/auth.module';

import { RequestedSeat } from './domain/requested-seat.entity';
import { RequestedSeatController } from './application/requested-seat.controller';
import { RequestedSeatService } from './domain/requested-seat.service';

@Module({
	imports: [
		SequelizeModule.forFeature([RequestedSeat]),
		forwardRef(() => AuthModule),
	],
	controllers: [RequestedSeatController],
	providers: [RequestedSeatService],
	exports: [RequestedSeatService],
})
export class RequestedSeatModule {}
