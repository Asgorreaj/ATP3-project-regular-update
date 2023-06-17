import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateDto } from './dto/create.dto';


let user = [];
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('user')
  getUsers() {
    return user;
  }

  @Post('add')
  createUser(@Body() createDto: CreateDto) {
    user.push(createDto);
    return 'User and ID Added';
  }

  @Get('find/:name')
  findUser(@Param('name') name: string) {
    let foundUsers = user.filter((user) => user.name == name);
    if (foundUsers.length) {
      return foundUsers;
    } else {
      return { message: 'User not found' };
    }
  }


  @Delete('delete/:name')
  deleteUser(@Param('name') name: string) {
    const deletedUser = user.find((user) => user.name === name);
    user = user.filter((User) => User.name != name);
    if (deletedUser) {
      return `User '${deletedUser.name}' with ID '${deletedUser.id}' and email '${deletedUser.email}' has been deleted`;
    } else {
      return { message: 'User not found' };
    }
  }
  @Delete('delete/:id')
  deleteUsers(@Param('id') id: number) {
    const deletedUser = user.find((user) => user.id === id);
    user = user.filter((User) => User.id != id);
    if (deletedUser) {
      return `User '${deletedUser.name}' with ID '${deletedUser.id}' and email '${deletedUser.email}' has been deleted`;
    } else {
      return { message: 'User not found' };
    }
  }

  @Put('update/:name')
  updateUsers(@Param('name') name: string, @Body() updateDto: CreateDto) {
    const index = user.findIndex((user) => user.name === name);
    if (index !== -1) {
      user[index] = updateDto;
      return 'User Updated';
    } else {
      return { message: 'User not found' };
    }
  }
}


