import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { BaseEntity } from 'incident-management-commons';
import { RoleEntity } from './role.entity';
import { UserAppEntity } from './user-app.entity';

@Entity({ name: 'user_app_type' })
export class UserAppTypeEntity extends BaseEntity {
  @PrimaryColumn({ name: 'user_type_code', type: 'varchar', length: 10 })
  userTypeCode: string;

  @Column({ name: 'name', type: 'varchar', length: 25 })
  name: string;

  @Column({ name: 'description', type: 'varchar', length: 50 })
  description: string;

  @Column({ name: 'is_admin' })
  isAdmin: boolean;

  @Column({ name: 'is_technical' })
  isTechnical: boolean;

  @ManyToOne(() => RoleEntity, (role) => role.userAppTypes)
  @JoinColumn({ name: 'role_code' })
  role: RoleEntity;

  @OneToMany(() => UserAppEntity, (ua) => ua.userType)
  users: UserAppEntity[];
}
