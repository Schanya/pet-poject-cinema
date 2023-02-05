import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';

import { RoleService } from '../../role/domain/role.service';

import { UserDto } from '../presentation/user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User) private userRepository: typeof User,
		private roleService: RoleService,
	) {}

	public async findAll(options: any): Promise<User[]> {
		return await this.userRepository.findAll({
			where: { ...options },
			include: { all: true },
		});
	}

	public async findBy(options: any): Promise<User> {
		return await this.userRepository.findOne({
			where: { ...options },
			include: { all: true },
		});
	}

	public async create(
		userDto: UserDto,
		transaction: Transaction,
	): Promise<User> {
		const existingUser = await this.findBy({ email: userDto.email });

		if (existingUser) {
			throw new BadRequestException('Such email is already in use');
		}

		const user = await this.userRepository.create(userDto, { transaction });
		const role = await this.roleService.findBy({ name: 'USER' });

		if (!role) {
			throw new BadRequestException('This role does not exist.');
		}

		await user.$set('roles', [role.id], { transaction });
		user.roles = [role];

		return user;
	}
}
