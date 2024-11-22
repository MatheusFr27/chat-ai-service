import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Thread {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    thread_id: string;

    @CreateDateColumn()
	created_at: Date;

	@CreateDateColumn({ nullable: true })
	finished_at: Date;
}