import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersService {
	private readonly users = [
		{
			id: 1,
			username: "john",
			email: "john@email.com",
			password: "devomudar",
		},
		{
			id: 2,
			username: "maria",
			email: "maria@email.com",
			password: "devomudar",
		},
	];

	async findOne(email: string) {
		return this.users.find((el) => el.email === email);
	}
}
