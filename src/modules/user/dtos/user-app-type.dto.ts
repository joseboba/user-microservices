import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserAppTypeDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  @ApiProperty()
  userTypeCode: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(25)
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  @ApiProperty()
  roleCode: string;
}
