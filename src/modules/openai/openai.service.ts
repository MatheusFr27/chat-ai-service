import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UUID } from "node:crypto";
import OpenAI from "openai";

@Injectable()
export class OpenaiService {
	private readonly client: OpenAI;

	constructor(private readonly configService: ConfigService) {
		const apiKey = this.configService.get("OPENAI_API_KEY");

		this.client = new OpenAI({
			apiKey: apiKey,
		});
	}

	async createAssistant(
		name: string,
		instructions: string,
	): Promise<OpenAI.Beta.Assistants.Assistant> {
		const assistant = await this.client.beta.assistants.create({
			model: this.configService.get("OPENAI_GPT_VERSION"),
			name,
			instructions,
		});

		return assistant;
	}

	async createThread(): Promise<OpenAI.Beta.Threads.Thread> {
		return await this.client.beta.threads.create();
	}

	async getThread(id: UUID): Promise<OpenAI.Beta.Threads.Thread> {
		return await this.client.beta.threads.retrieve(id);
	}

	async getAssistant(id: UUID): Promise<OpenAI.Beta.Assistants.Assistant> {
		return await this.client.beta.assistants.retrieve(id);
	}

	async generateResponse(
		message: string,
	): Promise<OpenAI.Chat.Completions.ChatCompletionMessage | null> {
		try {
			const response = await this.client.chat.completions.create({
				messages: [
					{
						role: "system",
						content:
							'Você é uma assistente virtual do Matheus e seu nome é Alex. Quando o humano dizer a palavra "Eita" você irá retornar dizendo "Eita 2"',
					},
					{
						role: "user",
						content: message,
					},
				],
				model: this.configService.get("OPENAI_GPT_VERSION"),
			});

			return response.choices[0].message;
		} catch (error) {
			console.error(error);
			throw new InternalServerErrorException("Error generating message");
		}
	}
}
