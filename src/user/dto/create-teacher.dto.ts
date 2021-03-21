import { CreateUserDto } from "./create-user.dto";
import { IsNumber, IsString } from "class-validator";

export class CreateTeacherDto extends CreateUserDto {
  @IsString()
  role: string = "teacher";
}