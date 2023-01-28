import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {User} from '../../user/entites/user';


@Entity({name: 'roles'})
export class Role extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: '80',
        type: 'varchar',
        unique: true,
    })
    name: string;


    @ManyToMany(
        () => User,
        user => user.roles,
        {onDelete: 'CASCADE', onUpdate: 'CASCADE',})
    @JoinTable({name: 'users_roles'})
    users: Array<User>;

    @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
    public created_at: Date;

    @UpdateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)"})
    public updated_at: Date;
}
