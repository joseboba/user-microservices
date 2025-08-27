import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { RoleDto } from './role.dto';
import { IsBoolean } from 'class-validator';

export class UpdateRoleDto extends PartialType(
  OmitType(RoleDto, ['roleCode' as const]),
) {
  @IsBoolean()
  @ApiProperty()
  isActive: boolean;
}
