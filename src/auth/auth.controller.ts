import { Controller, Post, Body, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,private readonly usersService: UsersService) { }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        const user = await this.authService.validateUser(loginDto.username, loginDto.password);
        await this.usersService.updateTime(user.id)
        user
        if (user == null) {
            throw new HttpException('User Not Found', HttpStatus.BAD_GATEWAY);
        }
        return this.authService.login(user);
    }
}
