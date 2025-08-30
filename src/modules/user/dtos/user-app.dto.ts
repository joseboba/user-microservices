import { IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserAppDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  @ApiProperty()
  name: string;

  @IsString()
  @MaxLength(25)
  @IsNotEmpty()
  @Matches(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    { message: 'Email is not valid' },
  )
  @ApiProperty()
  email: string;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsString()
  @MaxLength(10)
  @IsNotEmpty()
  @ApiProperty()
  userTypeCode: string;
}
