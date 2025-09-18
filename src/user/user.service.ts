import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor (
        @InjectRepository(User) private  readonly userRepository: Repository<User>,
    ){}
  async create (userData: Partial<User>):Promise<User>{
    const newUser = this.userRepository.create(userData)
    return  this.userRepository.save(newUser);

  }
  async findByEmail(email: string ):Promise<User| null>{
  return await  this.userRepository.findOne({where:{email},});
  }


    async findById(id : string ):Promise<User| null>{
  return await  this.userRepository.findOne({where:{id},});
  }
    }

