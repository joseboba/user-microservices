import { MenuOptionEntity } from '@entities';
import { ApiProperty } from '@nestjs/swagger';

export class MenuOptionsResponseDto {
  @ApiProperty()
  menuOptionFather: MenuOptionEntity;
  @ApiProperty()
  children: MenuOptionEntity[];
}
