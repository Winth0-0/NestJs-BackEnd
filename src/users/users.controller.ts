import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('Create')
  create(@Body() req: User) {
    return this.usersService.create(req);
  }
  @Post('createList')
  async createList(@Body() req: User[]): Promise<User[]> {
    const users = req.map(dto => {
      const user = new User();
      Object.assign(user, dto);
      return user;
    });
    return this.usersService.createList(users);
  }
  @Get('GetALL')
  @UseGuards(JwtAuthGuard)
  async findAll() {
    console.log('1');
    try {
      const users = await this.usersService.findAll();
      if (users.length > 0) {
        return users;
      } else {
        throw new HttpException('No users found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new HttpException('Error fetching users: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('GetByID/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch('Update/:id')
  update(@Param('id') id: string, @Body() req: User) {
    return this.usersService.update(+id, req);
  }

  @Delete('Delete/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
