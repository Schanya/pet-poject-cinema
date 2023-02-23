import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';
import { UploadTypesEnum } from '../core/helpers/upload-types.enum';

@Injectable()
export class MulterUtils {
	static getConfig(filesAllowed: UploadTypesEnum) {
		return {
			fileFilter: (req: any, file: any, cb: any) => {
				if (file.mimetype.match(`/(${filesAllowed})$`)) {
					cb(null, true);
				} else {
					cb(
						new HttpException(
							`Unsupported file type ${extname(file.originalname)}`,
							HttpStatus.BAD_REQUEST,
						),
						false,
					);
				}
			},

			storage: diskStorage({
				destination: (req: any, file: any, cb: any) => {
					const uploadPath = process.env.UPLOAD_LOCATION;

					if (!existsSync(uploadPath)) {
						mkdirSync(uploadPath);
					}
					cb(null, uploadPath);
				},

				filename: (req: any, file: any, cb: any) => {
					cb(null, `${uuid()}${extname(file.originalname)}`);
				},
			}),
		};
	}
}
