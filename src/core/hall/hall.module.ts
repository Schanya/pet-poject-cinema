import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { forwardRef } from '@nestjs/common/utils';

import { AuthModule } from '../auth/auth.module';

import { Hall } from './domain/hall.entity';
import { HallController } from './application/hall.controller';
import { HallService } from './domain/hall.service';

@Module({
	imports: [SequelizeModule.forFeature([Hall]), forwardRef(() => AuthModule)],
	controllers: [HallController],
	providers: [HallService],
	exports: [HallService],
})
export class HallModule {}
