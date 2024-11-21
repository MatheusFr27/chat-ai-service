import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	async signIn(email: string, password: string) {
		const user = await this.usersService.findOne(email);

		if (!user || user.password !== password) {
			throw new UnauthorizedException();
		}

		const payload = {
			sub: user.id,
			email: user.email,
			username: user.username,
		};

		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}
}
