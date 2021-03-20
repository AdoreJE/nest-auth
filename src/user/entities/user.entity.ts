import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

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
}