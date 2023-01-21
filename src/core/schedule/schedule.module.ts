import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { forwardRef } from '@nestjs/common/utils';

import { AuthModule } from '../auth/auth.module';

import { Schedule } from './schedule.entity';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';

@Module({
	imports: [
		SequelizeModule.forFeature([Schedule]),
		forwardRef(() => AuthModule),
	],
	controllers: [ScheduleController],
	providers: [ScheduleService],
	exports: [ScheduleService],
})
export class ScheduleModule {}
