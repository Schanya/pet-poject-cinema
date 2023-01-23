import {
	BadRequestException,
	Injectable,
	UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MovieDto } from '../dto/movie.dto';
import { Movie } from '../entities/movie.entity';

@Injectable()
export class MovieService {
	constructor(@InjectModel(Movie) private movieRepository: typeof Movie) {}

	public async findBy(options: any): Promise<Movie> {
		return await this.movieRepository.findOne({
			where: { ...options },
			include: { all: true },
		});
	}

	public async create(movieDto: MovieDto): Promise<Movie> {
		const existingMovie = await this.findBy({ name: movieDto.name });

		if (existingMovie) {
			throw new BadRequestException('Such movie has already exist');
		}

		return await this.movieRepository.create(movieDto);
	}

	public async update(id: number, movieDto: MovieDto): Promise<Movie> {
		const movie = await this.findBy({ id: id });

		if (!movie) {
			throw new BadRequestException("Such movie doesn't exist");
		}

		const existingMovie = await this.findBy({ name: movieDto.name });

		if (existingMovie) {
			throw new BadRequestException('Such movie has already exist');
		}

		await this.movieRepository.update(movieDto, { where: { id } });

		return await this.findBy({ id: id });
	}

	public async delete(id: string): Promise<any> {
		return await this.movieRepository.destroy({ where: { id } });
	}
}
