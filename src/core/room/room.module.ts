import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { forwardRef } from '@nestjs/common/utils';

import { AuthModule } from '../auth/auth.module';

import { Room } from './domain/room.entity';
import { RoomController } from './application/room.controller';
import { RoomService } from './domain/room.service';
import { UserModule } from '../user/user.module';

@Module({
	imports: [
		SequelizeModule.forFeature([Room]),
		forwardRef(() => AuthModule),
		UserModule,
	],
	controllers: [RoomController],
	providers: [RoomService],
	exports: [RoomService],
})
export class RoomModule {}
