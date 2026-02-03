import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtUser } from '../common/types/jwt-user.type';

interface AuthRequest extends Request {
  user: JwtUser;
}

@Controller('projects')
@UseGuards(AuthGuard('jwt'))
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Request() req: AuthRequest, @Body() body: { name: string }) {
    return this.projectsService.create(req.user.userId, body.name);
  }

  @Get()
  findAll(@Request() req: AuthRequest) {
    return this.projectsService.findAll(req.user.userId);
  }

  @Delete(':id')
  remove(@Request() req: AuthRequest, @Param('id') id: string) {
    return this.projectsService.remove(req.user.userId, Number(id));
  }
}
