import {
	HttpException,
	HttpStatus,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Transaction } from 'sequelize';

import { hash, compare } from '../../helpers/hash';
import { UserDto } from '../../user/presentation/user.dto';
import { User } from '../../user/domain/user.entity';
import { UserService } from '../../user/domain/user.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private jwtService: JwtService,
	) {}

	async validateUser(userDto: UserDto): Promise<User> {
		const candidate = await this.userService.findBy({ email: userDto.email });

		if (candidate && compare(userDto.password, candidate.password)) {
			const validUser = await this.userService.findBy({ id: candidate.id });

			return validUser;
		}

		throw new NotFoundException('Uncorrect email or password');
	}

	async registration(userDto: UserDto, transaction: Transaction) {
		const candidate = await this.userService.findBy({ email: userDto.email });

		if (candidate) {
			throw new HttpException(
				'You are already registered',
				HttpStatus.BAD_REQUEST,
			);
		}

		const hashPassword = hash(userDto.password);

		const registeredUser = await this.userService.create(
			{
				...userDto,
				password: hashPassword,
			},
			transaction,
		);

		return registeredUser;
	}

	async login(userDto: UserDto) {
		const user = await this.validateUser(userDto);
		const token = this.generateToken(user);

		return token;
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
