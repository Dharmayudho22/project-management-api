import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TasksService } from './tasks.service';
import { Request } from 'express';
import { GetUser } from '../common/decorators/get-user.decorator';
import { JwtUser } from '../common/types/jwt-user.type';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(
    @GetUser() user: JwtUser,
    @Body() body: { projectId: number; title: string },
  ) {
    return this.tasksService.create(user.userId, body.projectId, body.title);
  }

  @Get('project/:projectId')
  findByProject(
    @GetUser() user: JwtUser,
    @Param('projectId') projectId: string,
  ) {
    return this.tasksService.findByProject(user.userId, Number(projectId));
  }

  @Delete(':taskId')
  remove(@GetUser() user: JwtUser, @Param('taskId') taskId: string) {
    return this.tasksService.remove(user.userId, Number(taskId));
  }
}
