import { Module } from '@nestjs/common';
import { AssistantService } from './assistant.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assistant } from 'src/shared/entity/assistant.entity';
import { AssistantController } from './assistant.controller';
import { OpenaiModule } from 'src/modules/openai/openai.module';

@Module({
  imports: [TypeOrmModule.forFeature([Assistant]), OpenaiModule],
  providers: [AssistantService],
  controllers: [AssistantController],
})
export class AssistantModule {}
