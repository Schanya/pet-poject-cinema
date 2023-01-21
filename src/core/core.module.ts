import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { HallModule } from './hall/hall.module';
import { MovieModule } from './movie/movie.module';
import { RoleModule } from './role/role.module';
import { SchemaModule } from './schema/schema.module';
import { UserModule } from './user/user.module';

@Module({
	imports: [
		RoleModule,
		UserModule,
		AuthModule,
		MovieModule,
		HallModule,
		SchemaModule,
	],
})
export class CoreModule {}
