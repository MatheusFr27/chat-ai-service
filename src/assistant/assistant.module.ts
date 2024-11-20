import { Module } from '@nestjs/common';
import { AssistantService } from './assistant.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assistant } from 'src/entity/assistant.entity';
import { AssistantController } from './assistant.controller';
import { OpenaiModule } from 'src/openai/openai.module';

@Module({
  imports: [TypeOrmModule.forFeature([Assistant]), OpenaiModule],
  providers: [AssistantService],
  controllers: [AssistantController],
})
export class AssistantModule {}
