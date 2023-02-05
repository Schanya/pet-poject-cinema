import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { UserService } from 'src/core/user/domain/user.service';

import { Room } from './room.entity';

@Injectable()
export class RoomService {
	constructor(
		@InjectModel(Room) private roomRepository: typeof Room,
		readonly userService: UserService,
	) {}

	public async findAll(options: any): Promise<Room[]> {
		return await this.roomRepository.findAll({
			where: { ...options },
			include: { all: true },
		});
	}

	public async findBy(options: any): Promise<Room> {
		return await this.roomRepository.findOne({
			where: { ...options },
			include: { all: true },
		});
	}

	// public async create(
	// 	roomDto: RoomDto,
	// 	userId: number,
	// 	transaction: Transaction,
	// ): Promise<Room> {
	// 	const hasUserRoom = await this.userToRoomRepository.findOne({
	// 		where: { userId: userId },
	// 	});

	// 	if (hasUserRoom) {
	// 		throw new BadRequestException('User is already in the room');
	// 	}

	// 	const existingRoom = await this.findBy({ name: roomDto.name });

	// 	if (existingRoom) {
	// 		throw new BadRequestException('Such room has already exist');
	// 	}

	// 	const room = await this.roomRepository.create(roomDto, { transaction });

	// 	const user = await this.userService.findBy({ id: userId });

	// 	//user.$set('rooms', room);

	// 	return;
	// }
}
