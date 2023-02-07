import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { RoleDto, RoleOptions } from '../presentation/role.dto';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
	constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

	public async findBy(options: RoleOptions): Promise<Role> {
		const suitableRole = await this.roleRepository.findOne({
			where: { ...options },
		});

		return suitableRole;
	}
	public async create(roleDto: RoleDto): Promise<Role> {
		const existingRole = await this.findBy({
			name: roleDto.name,
		});

		if (existingRole) {
			throw new BadRequestException('Such role has already exist');
		}

		const createdRole = await this.roleRepository.create(roleDto);

		return createdRole;
	}
}
