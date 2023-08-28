import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    question: string
}