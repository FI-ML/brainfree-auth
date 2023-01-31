import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Role } from '../../role/entities/role';
import * as argon2 from 'argon2';

@Entity({ name: 'users' })
export class User extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: '10',
    type: 'varchar'
  })
  firstname: string;

  @Column({
    length: '70',
    type: 'varchar'
  })
  lastname: string;

  @Column({
    unique: true,
    length: '100',
    type: 'varchar'
  })
  email: string;

  @Column({
    type: 'text'
  })
  password: string;

  @Column({
    type: 'boolean',
    default: 'true'
  })
  isActive: boolean;

  @ManyToMany(
    () => Role,
    role => role.users,
    {
      cascade: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  @JoinTable({ name: 'users_roles' })
  roles: Array<Role>;

  @Column({
    type: 'varchar'
  })
  refreshToken: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  public updated_at: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    this.password = await argon2.hash(this.password);
  }
}
