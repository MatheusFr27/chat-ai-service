import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Thread } from "./thread.entity";

export enum MessageRole {
	ASSISTANT = "assistant",
	USER = "user",
}

@Entity()
export class Message {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@OneToOne(() => Thread)
	@JoinColumn()
	thread: Thread;

	@Column({
		type: "enum",
		enum: MessageRole,
		default: MessageRole.USER,
	})
	role: MessageRole;

	@Column()
	message: string;

	@CreateDateColumn()
	created_at: Date;

	@CreateDateColumn()
	updated_at: Date;
}
