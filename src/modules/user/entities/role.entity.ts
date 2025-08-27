import { BaseEntity } from 'incident-management-commons';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { RoleMenuOptionEntity } from './role-menu-option.entity';
import { UserAppTypeEntity } from './user-app-type.entity';

@Entity({ name: 'role' })
export class RoleEntity extends BaseEntity {
  @PrimaryColumn({ name: 'role_code', type: 'varchar', length: 10 })
  roleCode: string;

  @Column({ name: 'name', type: 'varchar', length: 25 })
  name: string;

  @Column({ name: 'description', type: 'varchar', length: 25 })
  description: string;

  @OneToMany(() => RoleMenuOptionEntity, (rmo) => rmo.role)
  roleMenuOptions: RoleMenuOptionEntity[];

  @OneToMany(() => UserAppTypeEntity, (uap) => uap.role)
  userAppTypes: UserAppTypeEntity[];
}
