import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Assistant {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "uuid" })
	assistant_id: string;

	@Column({ type: "varchar", length: "30" })
	name: string;

	@Column({ type: "longtext" })
	instructions: string;

	@CreateDateColumn()
	created_at: Date;

	@CreateDateColumn()
	updated_at: Date;
}
