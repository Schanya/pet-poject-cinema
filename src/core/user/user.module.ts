import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { RoleModule } from '../role/role.module';

import { User } from './user.entity';
import { UserToRole } from '../user-role.ts/user-role.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
	imports: [SequelizeModule.forFeature([User, UserToRole]), RoleModule],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}
