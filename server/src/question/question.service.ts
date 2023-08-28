import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Question} from "./question.entity";
import {Repository} from "typeorm";
import {CreateQuestionDto} from "./question.dto";

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(Question)
        private questionRepository: Repository<Question>
    ) {
    }

    async create(question: CreateQuestionDto) {
        const isUnique = await this.checkUnique(question.email)
        if (isUnique) {
            const createdQuestion = await this.questionRepository.create(question)
            await this.questionRepository.save(createdQuestion)
            return createdQuestion
        }
        return {'message': 'Вопрос с одного емейла можно отсылать не больше одного раза'}
    }

    async checkUnique(email: string) {
        const questions = await this.questionRepository.find({
            where: {email}
        })
        return questions.length >= 2 ? false : true
    }

    async getAll() {
        const questions = await this.questionRepository.find()
        return {questions}
    }

    async deleteQuestion(id: number) {
        await this.questionRepository.createQueryBuilder('question')
            .delete()
            .where("question.id = :id", { id })
            .execute()
        return {status: 204}
    }
}
