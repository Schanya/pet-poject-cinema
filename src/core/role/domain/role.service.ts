import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { RoleDto } from '../presentation/role.dto';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
	constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

	public async findBy(options: any): Promise<Role> {
		return await this.roleRepository.findOne({ where: { ...options } });
	}
	public async create(roleDto: RoleDto): Promise<Role> {
		const existingRole = await this.findBy({
			name: roleDto.name,
		});

		if (existingRole) {
			throw new BadRequestException('Such role has already exist');
		}

		return await this.roleRepository.create(roleDto);
	}
}
