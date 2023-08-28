import {Body, Controller, Get, Post, ValidationPipe} from '@nestjs/common';
import {QuestionService} from "./question.service";
import {CreateQuestionDto} from "./question.dto";

@Controller('question')
export class QuestionController {
    constructor(
        private readonly questionService: QuestionService
    ) {
    }

    @Post()
    async createQuestion(@Body(new ValidationPipe()) body: CreateQuestionDto) {
        return await this.questionService.create(body)
    }
}
