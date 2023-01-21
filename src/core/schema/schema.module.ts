import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { forwardRef } from '@nestjs/common/utils';

import { AuthModule } from '../auth/auth.module';

import { Schema } from './schema.entity';
import { SchemaController } from './schema.controller';
import { SchemaService } from './schema.service';

@Module({
	imports: [SequelizeModule.forFeature([Schema]), forwardRef(() => AuthModule)],
	controllers: [SchemaController],
	providers: [SchemaService],
	exports: [SchemaService],
})
export class SchemaModule {}
