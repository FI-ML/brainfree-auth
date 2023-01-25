import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: '10',
        type: 'varchar',
    })
    firstname: string;

    @Column({
        length: '70',
        type: 'varchar',
    })
    lastname: string;

    @Column({
        unique: true,
        length: '100',
        type: 'varchar',
    })
    email: string;

    @Column({
        type: 'text',
    })
    password: string;

    @Column({
        type: 'boolean',
        default: 'true'
    })
    isActive: boolean;


    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;
}