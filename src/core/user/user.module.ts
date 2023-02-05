import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { forwardRef } from '@nestjs/common/utils';

import { AuthModule } from '../auth/auth.module';
import { RoleModule } from '../role/role.module';

import { User } from './domain/user.entity';
import { UserController } from './application/user.controller';
import { UserService } from './domain/user.service';

@Module({
	imports: [
		SequelizeModule.forFeature([User]),
		forwardRef(() => AuthModule),
		RoleModule,
	],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}
