import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { OpenaiModule } from "./modules/openai/openai.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Assistant } from "./shared/entity/assistant.entity";
import { Thread } from "./shared/entity/thread.entity";
import { Message } from "./shared/entity/message.entity";
import { AssistantModule } from './modules/assistant/assistant.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { User } from "./shared/entity/users.entity";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				type: "mysql",
				host: configService.get("DATABASE_HOST"),
				port: configService.get("DATABASE_PORT"),
				username: configService.get("DATABASE_USER"),
				password: configService.get("DATABASE_PASSWORD"),
				database: configService.get("DATABASE_DB"),
				entities: [User, Assistant, Thread, Message],
				synchronize: configService.get("DEPLOYMENT") === "development",
			}),
			inject: [ConfigService],
		}),
		OpenaiModule,
		AssistantModule,
		AuthModule,
		UsersModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
