import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';
import { ReadAllResult } from 'src/common/types/read-all-result.type';

import { UserService } from 'src/core/user/domain/user.service';
import { RoomDto, RoomOptions } from '../presentation/room.dto';

import { Room } from './room.entity';

@Injectable()
export class RoomService {
	constructor(
		@InjectModel(Room) private roomRepository: typeof Room,
		readonly userService: UserService,
	) {}

	public async findAll(options: RoomOptions): Promise<ReadAllResult<Room>> {
		const { count, rows } = await this.roomRepository.findAndCountAll({
			where: { ...options },
			include: { all: true },
		});

		return {
			totalRecordsNumber: count,
			entities: rows,
		};
	}

	public async findBy(options: RoomOptions): Promise<Room> {
		const suitableRoom = await this.roomRepository.findOne({
			where: { ...options },
			include: { all: true },
		});

		return suitableRoom;
	}

	public async create(
		roomDto: RoomDto,
		userId: number,
		transaction: Transaction,
	): Promise<Room> {
		const user = await this.userService.findBy({ id: userId });

		const hasUserRoom = await user.$get('rooms', { transaction });

		if (hasUserRoom.length) {
			throw new BadRequestException('User is already in the room');
		}

		const existingRoom = await this.findBy({ name: roomDto.name });

		if (existingRoom) {
			throw new BadRequestException('Such room has already exist');
		}

		const createdRoom = await this.roomRepository.create(roomDto, {
			transaction,
		});

		await user.$set('rooms', createdRoom, { transaction });

		return createdRoom;
	}

	public async connection(
		userId: number,
		transaction: Transaction,
		roomId: number,
	): Promise<unknown> {
		const user = await this.userService.findBy({ id: userId });

		const hasUserRoom = await user.$get('rooms', { transaction });

		if (hasUserRoom.length) {
			throw new BadRequestException('User is already in the room');
		}

		const existingRoom = await this.findBy({ id: roomId });

		if (!existingRoom) {
			throw new BadRequestException('Such room has not exist');
		}

		const numberOfUsers = await existingRoom.$get('users', { transaction });

		if (numberOfUsers.length == existingRoom.numberOfUsers) {
			throw new BadRequestException('There are no seats in the room');
		}

		const result = await user.$add('rooms', existingRoom, { transaction });

		return result;
	}

	public async disconnection(
		userId: number,
		transaction: Transaction,
		roomId: number,
	) {
		const user = await this.userService.findBy({ id: userId });

		const hasUserRoom = await user.$get('rooms', { transaction });

		if (!hasUserRoom.length) {
			throw new BadRequestException('User is already in the room');
		}

		const existingRoom = await this.findBy({ id: roomId });

		if (!existingRoom) {
			throw new BadRequestException('Such room has not exist');
		}

		const numberOfUsers = await existingRoom.$get('users', { transaction });

		if (numberOfUsers.length == 1) {
			await this.delete(existingRoom.id);
		}

		const result = await user.$remove('rooms', existingRoom, { transaction });

		return result;
	}

	public async delete(id: number): Promise<number> {
		const numberDeletedRows = await this.roomRepository.destroy({
			where: { id },
		});

		return numberDeletedRows;
	}
}
