import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { BaseEntity } from 'incident-management-commons';
import { RoleMenuOptionEntity } from './role-menu-option.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'menu_option' })
export class MenuOptionEntity extends BaseEntity {
  @PrimaryColumn({ name: 'menu_option_code', type: 'varchar', length: 10 })
  @ApiProperty()
  menuOptionCode: string;

  @Column({ name: 'menu_father_option', type: 'varchar', length: 10 })
  @ApiProperty()
  menuFatherOption: string;

  @Column({ name: 'name', type: 'varchar', length: 50 })
  @ApiProperty()
  name: string;

  @ManyToOne(() => MenuOptionEntity, (parent) => parent.children, {
    nullable: true,
  })
  @JoinColumn({ name: 'menu_father_option' })
  parent: MenuOptionEntity | null;

  @OneToMany(() => MenuOptionEntity, (child) => child.parent)
  children: MenuOptionEntity[];

  @OneToMany(() => RoleMenuOptionEntity, (rmo) => rmo.menuOption)
  roleMenuOptions: RoleMenuOptionEntity[];
}
