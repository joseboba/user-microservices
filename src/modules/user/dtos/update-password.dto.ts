import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @IsString()
  @MaxLength(50)
  @ApiProperty()
  oldPassword: string;

  @IsString()
  @MaxLength(50)
  @ApiProperty()
  password: string;
}
