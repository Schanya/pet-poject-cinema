import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { forwardRef } from '@nestjs/common/utils';

import { AuthModule } from '../auth/auth.module';
import { RoleModule } from '../role/role.module';

import { User } from './user.entity';
import { UserToRole } from '../user-role/user-role.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
	imports: [
		SequelizeModule.forFeature([User, UserToRole]),
		RoleModule,
		forwardRef(() => AuthModule),
	],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}
