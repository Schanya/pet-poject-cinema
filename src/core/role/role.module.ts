import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { forwardRef } from '@nestjs/common/utils';

import { AuthModule } from '../auth/auth.module';

import { Role } from './domain/role.entity';
import { RoleController } from './application/role.controller';
import { RoleService } from './domain/role.service';

@Module({
	imports: [SequelizeModule.forFeature([Role]), forwardRef(() => AuthModule)],
	controllers: [RoleController],
	providers: [RoleService],
	exports: [RoleService],
})
export class RoleModule {}
