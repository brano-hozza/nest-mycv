import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    //see if email is in use
    const users = await this.usersService.find(email);
    if (users.length) {
      throw new BadRequestException('Email already in use');
    }
    //hash the users password
    // Generate a salt
    const salt = randomBytes(8).toString('hex');

    // Hash the salt and password together

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // Join hash and salt together
    const result = `${salt}.${hash.toString('hex')}`;
    //create the user

    const user = await this.usersService.create(email, result);

    //return the user
    return user;
  }

  signin() {}
}
