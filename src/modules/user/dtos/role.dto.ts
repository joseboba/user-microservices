import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RoleDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  @ApiProperty()
  roleCode: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty()
  description: string;
}