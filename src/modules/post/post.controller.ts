import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostModel } from '@prisma/client';
import { CreatePostsDto, UpdatePostDto } from './dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  /**
   * @description Function to get post by id
   * @param id
   * @returns
   */
  @Get(':id')
  async getPostById(@Param('id') id: string): Promise<PostModel> {
    return this.postService.post({ id: id });
  }

  /**
   * @description Function to get published post
   * @returns
   */
  @Get('post/published')
  async getPublishedPosts() {
    try {
      const publishedPosts = await this.postService.getPublishedPosts();
      return publishedPosts;
    } catch (error) {
      return error;
    }
  }

  /**
   * @description Function to search post
   * @param searchString
   * @returns
   */
  @Get('filtered-posts/:searchString')
  async getFilteredPosts(
    @Param('searchString') searchString: string,
  ): Promise<PostModel[]> {
    return this.postService.posts({
      where: {
        OR: [
          {
            title: { contains: searchString },
          },
          {
            content: { contains: searchString },
          },
        ],
      },
    });
  }

  /**
   * @description Function to create new post
   * @param postData
   * @returns
   */
  @Post()
  async createPost(@Body() postData: CreatePostsDto): Promise<PostModel> {
    const { title, content, authorId } = postData;
    return this.postService.createPost({
      title,
      content,
      author: {
        connect: { id: authorId },
      },
    });
  }

  /**
   * @description Function to publish post
   * @param id
   * @returns
   */
  @Put('publish-post/:id')
  async publishPost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.updatePost({
      where: { id: id },
      data: { published: true },
    });
  }

  /**
   * @description Function to publish post
   * @param id
   * @returns
   */
  @Put('update-post/:id')
  async updatePost(
    @Param('id') id: string,
    @Body() postData: UpdatePostDto,
  ): Promise<PostModel> {
    return this.postService.updatePost({
      where: { id: id },
      data: postData,
    });
  }

  /**
   * @description Function to delete post
   * @param id
   * @returns
   */
  @Delete(':id')
  async deletePost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.deletePost({ id: id });
  }
}
