import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { UUID } from 'node:crypto';
import { Assistant } from 'src/entity/assistant.entity';
import { DataSource, type QueryRunner, Repository } from 'typeorm';

@Injectable()
export class AssistantService {
    private queryRunner: QueryRunner;

    constructor(@InjectRepository(Assistant) private readonly assistantRepository: Repository<Assistant>, private readonly dataSource: DataSource) {
        this.queryRunner = this.dataSource.createQueryRunner();
    }

    async findOne(id: UUID): Promise<Assistant | null> {
        return await this.assistantRepository.findOneBy({ id })
    }

    async create(name: string, instructions: string, assistantId: string): Promise<Assistant> {
        await this.queryRunner.connect()
        await this.queryRunner.startTransaction()
        
        try {
            const assistant = await this.assistantRepository.save({ name, instructions, assistant_id: assistantId })

            await this.queryRunner.commitTransaction();
            await this.queryRunner.release();
            
            return assistant;
        } catch(error) {
            await this.queryRunner.rollbackTransaction();
            await this.queryRunner.release();

            throw new InternalServerErrorException('Error creating assistant', error);
        }
    }
    
    async update(id: UUID, name: string, instructions: string): Promise<boolean> {
        await this.queryRunner.connect()
        await this.queryRunner.startTransaction()
        
        try {
            const result = await this.assistantRepository.update(id, { name, instructions })

            await this.queryRunner.commitTransaction();
            await this.queryRunner.release();
            
            return !!result.affected;
        } catch(error) {
            await this.queryRunner.rollbackTransaction();
            await this.queryRunner.release();

            throw new InternalServerErrorException('Error creating assistant', error);
        }
    }
}
