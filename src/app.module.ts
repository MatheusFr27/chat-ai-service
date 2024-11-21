import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { OpenaiModule } from "./openai/openai.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Assistant } from "./entity/assistant.entity";
import { Thread } from "./entity/thread.entity";
import { Message } from "./entity/message.entity";
import { AssistantModule } from './assistant/assistant.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

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
				entities: [Assistant, Thread, Message],
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
