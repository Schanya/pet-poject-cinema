import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { forwardRef } from '@nestjs/common/utils';

import { AuthModule } from '../auth/auth.module';

import { User, Role, UserToRole } from './entities';
import { UserController, RoleController } from './controllers';
import { UserService, RoleService } from './services';

@Module({
	imports: [
		SequelizeModule.forFeature([User, UserToRole, Role]),
		forwardRef(() => AuthModule),
	],
	controllers: [UserController, RoleController],
	providers: [UserService, RoleService],
	exports: [UserService, RoleService],
})
export class UserModule {}
