import { UpdatePostDto as IUpdatePostDto } from '@lib/post/application-services/commands/dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

export class UpdatePostDto implements IUpdatePostDto {
  @ApiProperty({
    description: 'Идентификатор поста',
    type: 'string',
    example: uuidv4(),
  })
  @IsUUID()
  id: string;

  @IsUUID()
  authorId: string;

  @ApiPropertyOptional({ description: 'Заголовок поста', type: 'string' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @ApiPropertyOptional({ description: 'Сообщение поста', type: 'string' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  message?: string;
}
