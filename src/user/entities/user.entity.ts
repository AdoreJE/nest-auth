import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { Student } from "./student.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  seq: number;

  @Column()
  userName: string;

  @PrimaryColumn()
  userId: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @OneToOne(type => Student, student => student.userId)
  studentInfo: Student
}