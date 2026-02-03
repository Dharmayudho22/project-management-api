import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TasksService } from './tasks.service';
import { Request } from 'express';
import { JwtUser } from '../common/types/jwt-user.type';

interface AuthRequest extends Request {
  user: JwtUser;
}

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(
    @Req() req: AuthRequest,
    @Body() body: { projectId: number; title: string },
  ) {
    return this.tasksService.create(
      req.user.userId,
      body.projectId,
      body.title,
    );
  }

  @Get('project/:projectId')
  findByProject(
    @Req() req: AuthRequest,
    @Param('projectId') projectId: string,
  ) {
    return this.tasksService.findByProject(req.user.userId, Number(projectId));
  }

  @Delete('taksId')
  remove(@Req() req: AuthRequest, @Param('taskId') taskId: string) {
    return this.tasksService.remove(req.user.userId, Number(taskId));
  }
}
