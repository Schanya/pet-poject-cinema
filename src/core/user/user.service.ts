import { Injectable, UseInterceptors } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { RoleService } from '../role/role.service';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User) private userRepository: typeof User,
		private roleService: RoleService,
	) {}

	public async findBy(options: any): Promise<User> {
		return this.userRepository.findOne({
			where: { ...options },
			include: { all: true },
		});
	}

	public async create(userDto: UserDto): Promise<User> {
		const user = await this.userRepository.create(userDto);

		const role = await this.roleService.findBy({ name: 'USER' });

		user.$set('roles', [role.id]);
		user.roles = [role];

		return user;
	}
}
