import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';
import { ReadAllResult } from 'src/common/types/read-all-result.type';

import { RoleService } from '../../role/domain/role.service';

import { UserDto, UserOptions } from '../presentation/user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User) private userRepository: typeof User,
		private roleService: RoleService,
	) {}

	public async findAll(options: UserOptions): Promise<ReadAllResult<User>> {
		const { count, rows } = await this.userRepository.findAndCountAll({
			where: { ...options },
			include: { all: true },
		});

		return {
			totalRecordsNumber: count,
			entities: rows,
		};
	}

	public async findBy(options: UserOptions): Promise<User> {
		const suitableUser = await this.userRepository.findOne({
			where: { ...options },
			include: { all: true },
		});

		return suitableUser;
	}

	public async create(
		userDto: UserDto,
		transaction: Transaction,
	): Promise<User> {
		const existingUser = await this.findBy({ email: userDto.email });

		if (existingUser) {
			throw new BadRequestException('Such email is already in use');
		}

		const createdUser = await this.userRepository.create(userDto, {
			transaction,
		});
		const role = await this.roleService.findBy({ name: 'USER' });

		if (!role) {
			throw new BadRequestException('This role does not exist.');
		}

		await createdUser.$set('roles', [role.id], { transaction });
		createdUser.roles = [role];

		return createdUser;
	}
}
