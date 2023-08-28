import {IsString} from "class-validator";


export class CreateQuestionDto {
    @IsString()
    email: string

    @IsString()
    question: string
}