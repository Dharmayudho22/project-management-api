import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, projectId: number, title: string) {
    const project = await this.prisma.project.findFirst({
      where: {
        id: projectId,
        ownerId: userId,
      },
    });

    if (!project) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.task.create({
      data: {
        title,
        projectId,
      },
    });
  }

  async findByProject(userId: number, projectId: number) {
    const project = await this.prisma.project.findFirst({
      where: {
        id: projectId,
        ownerId: userId,
      },
    });

    if (!project) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.task.findMany({
      where: { projectId },
    });
  }

  async remove(userId: number, taskId: number) {
    const task = await this.prisma.task.findFirst({
      where: {
        id: taskId,
        project: {
          ownerId: userId,
        },
      },
    });

    if (!task) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.task.delete({
      where: { id: taskId },
    });
  }

  async update(userId: number, taskId: number, dto: UpdateTaskDto) {
    const task = await this.prisma.task.findFirst({
      where: {
        id: taskId,
        project: {
          ownerId: userId,
        },
      },
    });

    if (!task) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.task.update({
      where: { id: taskId },
      data: dto,
    });
  }
}
