import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, name: string) {
    return this.prisma.project.create({
      data: {
        name,
        ownerId: userId,
      },
    });
  }

  async findAll(userId: number) {
    return this.prisma.project.findMany({
      where: {
        ownerId: userId,
      },
    });
  }

  async remove(userId: number, projectId: number) {
    return this.prisma.project.deleteMany({
      where: {
        id: projectId,
        ownerId: userId,
      },
    });
  }
}
