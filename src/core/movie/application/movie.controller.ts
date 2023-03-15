import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	Param,
	Post,
	Put,
	Res,
	StreamableFile,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { MulterUtils } from 'src/configs/multer-module-options.config';
import { UploadTypesEnum } from 'src/core/helpers/upload-types.enum';
import { JwtAuthGuard, RolesGuard } from '../../auth/guards';
import { Roles } from '../../helpers/decorators';

import { MovieService } from '../domain/movie.service';
import { MovieDto } from '../presentation/movie.dto';

@Controller('movie')
export class MovieController {
	constructor(readonly movieService: MovieService) {}

	@Get('/getFile')
	redirect(@Res() res: Response) {
		return res.redirect('/index.html');
	}

	@Get('/file/:id')
	async getFile(
		@Res({ passthrough: true }) res: Response,
		@Param('id') id: number,
	): Promise<StreamableFile> {
		const suitableMovie = await this.movieService.findBy({ id });

		const file = createReadStream(suitableMovie.url);
		res.set({
			'Content-Type': 'video/mp4',
			'Content-Disposition': 'attachment; filename="video.mp4"',
		});
		return new StreamableFile(file);
	}

	@Get()
	async getAll(@Res() res: Response) {
		const movies = await this.movieService.findAll({});

		res.status(HttpStatus.OK).send(movies);
	}

	@Roles('ADMIN')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@UseInterceptors(
		FileInterceptor('file', MulterUtils.getConfig(UploadTypesEnum.VIDEO)),
	)
	@Post()
	async create(
		@UploadedFile()
		file: Express.Multer.File,
		@Body() movieDto: MovieDto,
		@Res() res: Response,
	) {
		const movie = await this.movieService.create(movieDto, file.path);

		res.status(HttpStatus.OK).send({
			message: `Movie ${movie.name} created successfully`,
			file: file.destination,
		});
	}

	@Roles('ADMIN')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@UseInterceptors(
		FileInterceptor('file', MulterUtils.getConfig(UploadTypesEnum.VIDEO)),
	)
	@Put(':id')
	async update(
		@Param('id')
		id: number,
		@Body() movieDto: MovieDto,
		@Res() res: Response,
		@UploadedFile()
		file?: Express.Multer.File,
	) {
		const updatedMovie = await this.movieService.update(
			id,
			movieDto,
			file.path,
		);

		res
			.status(HttpStatus.OK)
			.send(`Movie ${updatedMovie.name} updated successfully`);
	}

	@Roles('ADMIN')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete(':id')
	async delete(@Param('id') id: number, @Res() res: Response) {
		await this.movieService.delete(id);

		res.status(HttpStatus.OK).send(`Movie deleted successfully`);
	}
}
