import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { SubjectService } from './subject.service';
@Controller('subject')
export class SubjectController {
    constructor(private readonly subjectService: SubjectService) { }
    @Get('get-all')
    findAll() {
        const response = this.subjectService.findAll();
        if (response == null) {
            throw new HttpException('ERROR', HttpStatus.BAD_GATEWAY);
        }
        return response;
    }
}