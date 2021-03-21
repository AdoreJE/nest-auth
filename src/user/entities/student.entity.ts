import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Student {
  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  studentId: number;

  @Column()
  grade: number;

  @Column()
  class: number;
}