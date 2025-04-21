import { Body, Controller, Post } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { Authors, LoginDto } from 'src/entity/authors.entity';

@Controller('authors')
export class AuthorsController {
    constructor(private readonly authService: AuthorsService) { }

    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<Authors> {
        return this.authService.login(loginDto);
    }
}
