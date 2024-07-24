import { PartialType } from '@nestjs/mapped-types';
import { IsDefined, IsString } from 'class-validator';
import { CreatePostsDto } from './create-posts.dto';

export class UpdatePostDto extends PartialType(CreatePostsDto) {
  @IsDefined()
  @IsString()
  readonly id: string;
}
