import { Controller, Get, Post, Body, UsePipes, Req, Param, Put, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateDto } from './dto/create.dto';
import { NewDto } from './dto/newDto';
import { Request } from 'express';
import session, { Session } from 'express-session';
import { SessionData } from 'express-session';

export interface CustomSession extends SessionData {
  userId: number;
}

class User {
  public id: number;
  public username: string;
  public password: string;
  public email: string;

  constructor(id: number, username: string, password: string, email: string) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
  }
}

let Users: User[] = [];

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('user')
  getUsers(): User[] {
    return Users.map(({ id, username, password, email }) => ({
      id,
      username,
      password,
      email
    }));
  }

  @Post('register')
  registerUser(@Body() newDto: NewDto): string {
    const { username, password, email } = newDto;
    const existingUser = Users.find((user) => user.username === username);

    if (existingUser) {
      return 'Username already exists';
    }

    const id = Users.length + 1;
    const newUser = new User(id, username, password, email);
    Users.push(newUser);
    return 'Registration successful';
  }

  @Post('login')
  loginUser(@Body() newDto: NewDto, @Req() req: Request & { session: CustomSession }): string {
    const { username, password } = newDto;
    const user = Users.find((u) => u.username === username && u.password === password);

    if (user) {
      req.session.userId = user.id;
      return 'Login successful';
    }
    else {
      return 'Invalid username or password';
    }
  }

  @Get('profile')
  getProfile(@Req() req: Request & { session: CustomSession }): string {
    const userId = req.session.userId;
    if (userId) {
      const user = Users.find((u) => u.id === userId);
      if (user) {
        return `ID: ${user.id}, Username: ${user.username}, email: ${user.email}`;
      }
    }
    return 'User not found';
  }




  @Get('search/:username')
  searchProfile(@Param('username') username: string): User | string {
    const user = Users.find((u) => u.username === username);
    if (user) {
      return user;
    }
    return 'User not found';
  }


  @Put('update/:username')
  updateUser(@Param('username') username: string, @Body() updateDto: NewDto): string {
    const user = Users.find((u) => u.username === username);
    if (user) {
      user.username = updateDto.username;
      user.password = updateDto.password;
      user.email = updateDto.email;
      return 'User updated successfully';
    }
    return 'User not found';
  }




  @Delete('profile')
  deleteProfile(@Req() req: Request & { session: CustomSession }): string {
    const userId = req.session.userId;
    if (userId) {
      const userIndex = Users.findIndex((u) => u.id === userId);
      if (userIndex !== -1) {
        Users.splice(userIndex, 1);
        req.session.destroy((err) => {
          if (err) {
            console.log(err);
          }
        });
        return 'Profile deleted successfully';
      }
    }
    return 'User not found';
  }
  @Post('logout')
  logout(@Req() req: Request & { session: Session }): string {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      }
    });
    return 'Logout successful';
  }

  @Put('reset-password')
  resetPassword(@Req() req: Request & { session: CustomSession }, @Body() resetDto: NewDto): string {
    const userId = req.session.userId;
    if (userId) {
      const user = Users.find((u) => u.id === userId);
      if (user) {
        user.password = resetDto.newPassword;
        return 'Password reset successful';
      }
    }
    return 'User not found';
  }



}
