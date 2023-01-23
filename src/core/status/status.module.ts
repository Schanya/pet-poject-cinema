import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { StatusController } from './status.controller';
import { Status } from './status.entity';
import { StatusService } from './status.service';

@Module({
	imports: [SequelizeModule.forFeature([Status]), forwardRef(() => AuthModule)],
	controllers: [StatusController],
	providers: [StatusService],
	exports: [StatusService],
})
export class StatusModule {}
