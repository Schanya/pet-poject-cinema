import {
	HttpException,
	HttpStatus,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Transaction } from 'sequelize';

import { hash, compare } from '../helpers/hash';
import { UserDto } from '../user/dto/user.dto';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/services/user.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private jwtService: JwtService,
	) {}

	async validateUser(userDto: UserDto): Promise<User> {
		const user = await this.userService.findBy({ email: userDto.email });

		if (user && compare(userDto.password, user.password))
			return await this.userService.findBy({ id: user.id });

		throw new NotFoundException('Uncorrect email or password');
	}

	async registration(userDto: UserDto, transaction: Transaction) {
		const candidate = await this.userService.findBy({ email: userDto.email });

		if (candidate) {
			throw new HttpException(
				'User with this email exists',
				HttpStatus.BAD_REQUEST,
			);
		}

		const hashPassword = hash(userDto.password);

		const user = await this.userService.create(
			{
				...userDto,
				password: hashPassword,
			},
			transaction,
		);

		return user;
	}

	async login(userDto: UserDto) {
		const user = await this.validateUser(userDto);
		return this.generateToken(user);
	}

	private async generateToken(user: User) {
		const payload = {
			id: user.id,
			email: user.email,
			roles: user.roles.map((role) => role.name),
		};
		return {
			token: this.jwtService.sign(payload),
		};
	}
}
