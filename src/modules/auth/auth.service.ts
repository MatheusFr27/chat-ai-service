import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/modules/users/users.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	async signIn(email: string, password: string) {
		const user = await this.usersService.findOne(email);

		const match = await bcrypt.compare(password, user.password);

		if (!user || !match) {
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

	async register(username: string, email: string, password: string) {
		const passwordHash = await bcrypt.hash(password, 10);

		await this.usersService.register(username, email, passwordHash);

		return true;
	}
}
