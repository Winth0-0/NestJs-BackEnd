import { Controller, Get } from '@nestjs/common';
import { SubjectService } from 'src/subject/subject.service';
@Controller('teacher')
export class TeacherController {
    constructor(private readonly subjectService: SubjectService) { }
    @Get('subject-from-teacher-module')
    findAll() {
        const response = this.subjectService.findAll();
        return response;
    }
}