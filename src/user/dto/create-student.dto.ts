import { CreateUserDto } from "./create-user.dto";
import { IsNumber, IsString } from "class-validator";

export class CreateStudentDto extends CreateUserDto {
  @IsString()
  userId: string;

  @IsString()
  role: string = "student";

  @IsNumber()
  studentId: number;

  @IsNumber()
  grade: number;

  @IsNumber()
  class: number;
}