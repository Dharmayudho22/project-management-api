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
import { GetUser } from '../common/decorators/get-user.decorator';
import { JwtUser } from '../common/types/jwt-user.type';

@Controller('projects')
@UseGuards(AuthGuard('jwt'))
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@GetUser() user: JwtUser, @Body() body: { name: string }) {
    return this.projectsService.create(user.userId, body.name);
  }

  @Get()
  findAll(@GetUser() user: JwtUser) {
    return this.projectsService.findAll(user.userId);
  }

  @Delete(':id')
  remove(@GetUser() user: JwtUser, @Param('id') id: string) {
    return this.projectsService.remove(user.userId, Number(id));
  }
}
