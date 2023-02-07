import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { forwardRef } from '@nestjs/common/utils';

import { AuthModule } from '../auth/auth.module';

import { Status } from './domain/status.entity';
import { StatusController } from './application/status.controller';
import { StatusService } from './domain/status.service';

@Module({
	imports: [SequelizeModule.forFeature([Status]), forwardRef(() => AuthModule)],
	controllers: [StatusController],
	providers: [StatusService],
	exports: [StatusService],
})
export class StatusModule {}
