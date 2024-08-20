import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { SubjectModule } from 'src/subject/subject.module';

@Module({
  imports: [SubjectModule],
  controllers: [TeacherController],
  providers: [TeacherService]
})
export class TeacherModule { }
