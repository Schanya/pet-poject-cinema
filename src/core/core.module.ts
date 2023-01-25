import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CinemaModule } from './cinema/cinema.module';

@Module({
	imports: [UserModule, AuthModule, CinemaModule],
})
export class CoreModule {}
