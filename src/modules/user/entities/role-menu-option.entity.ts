import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { RoleEntity } from './role.entity';
import { MenuOptionEntity } from './menu-option.entity';

@Entity({ name: 'role_menu_option' })
export class RoleMenuOptionEntity {

  @PrimaryColumn({ name: 'role_code', type: 'varchar', length: 10 })
  roleCode: string;

  @PrimaryColumn({ name: 'menu_option_code', type: 'varchar', length: 10 })
  menuOptionCode: string;

  @ManyToOne(() => RoleEntity, (role) => role.roleMenuOptions)
  @JoinColumn({ name: 'role_code' })
  role: RoleEntity;

  @ManyToOne(() => MenuOptionEntity, (role) => role.roleMenuOptions)
  @JoinColumn({ name: 'menu_option_code' })
  menuOption: MenuOptionEntity;

}