import { IsNotEmpty } from 'class-validator';

export class CreatePostsDto {
  @IsNotEmpty({ message: 'title is required' })
  title: string;

  @IsNotEmpty({ message: 'content is required' })
  content: string;

  @IsNotEmpty({ message: 'authorId is required' })
  authorId: string;
}
