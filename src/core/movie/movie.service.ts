import { Injectable, UseInterceptors } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MovieDto } from './dto/movie.dto';
import { Movie } from './movie.entity';

@Injectable()
export class MovieService {
	constructor(@InjectModel(Movie) private movieRepository: typeof Movie) {}

	public async findBy(options: any): Promise<Movie> {
		return this.movieRepository.findOne({
			where: { ...options },
			include: { all: true },
		});
	}

	public async create(movieDto: MovieDto): Promise<Movie> {
		const movie = await this.movieRepository.create(movieDto);

		return movie;
	}

	public async update(id: number, moviDto: MovieDto): Promise<Movie> {
		await this.movieRepository.update(moviDto, { where: { id } });

		return await this.findBy({ id: id });
	}

	public async delete(id: string): Promise<any> {
		return this.movieRepository.destroy({ where: { id } });
	}
}
