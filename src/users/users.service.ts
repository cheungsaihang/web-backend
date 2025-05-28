import { Injectable } from '@nestjs/common';
import { Prisma, Users } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) {}
  
  async getUser(
    userWhereUniqueInput: Prisma.UsersWhereUniqueInput,
  ): Promise<Users | null> {
    return this.prisma.users.findUnique({
      where: userWhereUniqueInput,
    });
  }
}
