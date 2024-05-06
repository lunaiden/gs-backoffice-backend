import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from './entities/role.entity';

export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>,
    @InjectRepository(Role)
    private RoleRepository: Repository<Role>,
  ) {
    super(
      UserRepository.target,
      UserRepository.manager,
      UserRepository.queryRunner,
    );
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.findOneBy({ email });
  }

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    const { email, password, roleName } = createUserDto;
    // hash puis stocke password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      email,
      password: hashedPassword,
    });

    user.role = await this.RoleRepository.findOne({
      where: { name: roleName },
    });

    try {
      await this.save(user);
    } catch (err) {
      if (err.code === '23505') {
        // email existe déjà
        console.log(err);
        throw new ConflictException('Cet utilisateur existe déjà.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
