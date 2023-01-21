import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsDefined, IsInt, IsDate } from 'class-validator';

export class ScheduleDto {
	@IsNotEmpty()
	@Transform(({ value }) => {
		value = value.split(' ').join('T') + '+0000';
		return new Date(value);
	})
	@IsDate()
	date: Date;

	@IsDefined()
	@IsInt({ each: true })
	@Transform((movieId) => Number(movieId))
	movieId: number;

	@IsDefined()
	@IsInt({ each: true })
	@Transform((hallId) => Number(hallId))
	hallId: number;
}
