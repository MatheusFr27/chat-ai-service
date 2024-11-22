import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { OpenaiService } from 'src/modules/openai/openai.service';
import { AssistantService } from './assistant.service';

@Controller('assistant')
export class AssistantController {

    constructor(private readonly assistantService: AssistantService, private readonly openai: OpenaiService) {}

    @Post()
    async createAssistant(@Body() body: { name: string, instructions: string }) {
        try {
            const { name, instructions } = body;

            const assistant = await this.openai.createAssistant(name, instructions);

            const result = await this.assistantService.create(name, instructions, assistant.id);

            return result;
        } catch(error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Error creating assistant'
            }, HttpStatus.INTERNAL_SERVER_ERROR, {
                cause: error
            })
        }
    }

}
