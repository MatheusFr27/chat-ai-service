import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/shared/entity/users.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
	constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

	async findOne(email: string): Promise<User | null> {
		return await this.userRepository.findOneBy({ email });
	}

	async register(username: string, email: string, password: string): Promise<User> {
		return await this.userRepository.save({username, email, password});
	}
}
