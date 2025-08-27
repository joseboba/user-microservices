import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { UserAppTypeDto } from './user-app-type.dto';
import { IsBoolean } from 'class-validator';

export class UpdateUserAppTypeDto extends PartialType(
  OmitType(UserAppTypeDto, ['userTypeCode' as const]),
) {
  @IsBoolean()
  @ApiProperty()
  isActive: boolean;
}
