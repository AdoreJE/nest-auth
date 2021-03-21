import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateStudentDto } from "./dto/create-student.dto";
import { CreateTeacherDto } from "./dto/create-teacher.dto";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.userService.create(createUserDto);
  }

  @Post('student')
  createStudent(@Body() createStudentDto: CreateStudentDto): Promise<any> {
    return this.userService.create(createStudentDto);
  }

  @Post('teacher')
  createTeacher(@Body() createTeacherDto: CreateTeacherDto): Promise<any> {
    return this.userService.create(createTeacherDto);
  }

  @Get()
  // @Role("admin")
  // @UseGuards(RolesGuard)
  // @UseGuards(JwtAuthGuard)
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  // @Role("user")
  // @UseGuards(RolesGuard)
  // @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<any> {
    return this.userService.update(id, updateUserDto);
  }

}
