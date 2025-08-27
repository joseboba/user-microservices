import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { UserAppDto } from '@dtos';
import { IsBoolean } from 'class-validator';

export class UpdateUserAppDto extends PartialType(
  OmitType(UserAppDto, ['password'] as const),
) {
  @IsBoolean()
  @ApiProperty()
  isActive: boolean;

}
