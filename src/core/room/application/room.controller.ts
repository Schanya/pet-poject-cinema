import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Req,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { Transaction } from 'sequelize';
import { ReadAllResult } from 'src/common/types/read-all-result.type';

import { TransactionInterceptor } from 'src/core/helpers/interceptors';
import { JwtAuthGuard, RolesGuard } from '../../auth/guards';
import { Roles, TransactionParam } from '../../helpers/decorators';
import { Room } from '../domain/room.entity';

import { RoomService } from '../domain/room.service';
import { RoomDto } from '../presentation/room.dto';

@Controller('room')
export class RoomController {
	constructor(readonly roomService: RoomService) {}

	@HttpCode(HttpStatus.OK)
	@Get()
	async getAll(): Promise<ReadAllResult<Room>> {
		const rooms = await this.roomService.findAll({});

		return {
			totalRecordsNumber: rooms.totalRecordsNumber,
			entities: rooms.entities,
		};
	}

	@Roles('USER', 'ADMIN')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@UseInterceptors(TransactionInterceptor)
	@HttpCode(HttpStatus.OK)
	@Post()
	async create(
		@Body() roomDto: RoomDto,
		@Req() req,
		@TransactionParam() transaction: Transaction,
	) {
		const room = await this.roomService.create(
			roomDto,
			req.user.id,
			transaction,
		);

		return room;
	}

	@Roles('USER', 'ADMIN')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@UseInterceptors(TransactionInterceptor)
	@HttpCode(HttpStatus.OK)
	@Post('/connection/:id')
	async connection(
		@Param('id') roomId: number,
		@Req() req,
		@TransactionParam() transaction: Transaction,
	) {
		await this.roomService.connection(req.user.id, transaction, roomId);

		return `You have successfully connected to the room`;
	}

	@Roles('USER', 'ADMIN')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@UseInterceptors(TransactionInterceptor)
	@HttpCode(HttpStatus.OK)
	@Delete('/disconnection/:id')
	async disconnection(
		@Param('id') roomId: number,
		@Req() req,
		@TransactionParam() transaction: Transaction,
	) {
		await this.roomService.disconnection(req.user.id, transaction, roomId);

		return `You have successfully disconnected to the room`;
	}
}
