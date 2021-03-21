import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from 'bcrypt';
import { bcryptConstant } from "../common/constants";
import { response } from "express";
import { Student } from "./entities/student.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>
  ) {}

  async create(createUserDto): Promise<any> {
    const isExist = await this.userRepository.findOne({userId: createUserDto.userId});
    if (isExist) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`이미 등록된 사용자입니다.`],
        error: 'Forbidden'
      })
    }
    createUserDto.password = await bcrypt.hash(createUserDto.password, bcryptConstant.saltOrRounds);
    const { password, ...result } = await this.userRepository.save(createUserDto);
    if (createUserDto.studentId !== undefined) {
      await this.studentRepository.save(createUserDto);
    }
    return result;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      select: ["seq", "userId", "userName", "role"],
    });
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne({userId: id}, {
      select: ["seq", "userId", "userName", "role"],
    });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<void> {
    const isExist = await this.userRepository.findOne({userId: id});
    if (!isExist) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`사용자 등록을 먼저 해주세요.`],
        error: 'Forbidden'
      })
    }
    if (updateUserDto.password !== undefined) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, bcryptConstant.saltOrRounds);
    }
    await this.userRepository.update(id, updateUserDto);
  }
}
