import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { forwardRef } from '@nestjs/common/utils';

import { AuthModule } from '../auth/auth.module';

import { Role } from './role.entity';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
	imports: [SequelizeModule.forFeature([Role]), forwardRef(() => AuthModule)],
	controllers: [RoleController],
	providers: [RoleService],
	exports: [RoleService],
})
export class RoleModule {}
