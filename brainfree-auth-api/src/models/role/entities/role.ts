import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { User } from '../../user/entites/user';


@Entity({ name: 'roles' })
export class Role extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;


  //TODO: ADD UNIQUE CONSTRAINT
  @Column({
    length: '80',
    type: 'varchar'
  })
  name: string;

  @ManyToMany((type) => User, (user) => user.roles)
  users: User[];


  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  public updated_at: Date;
}
