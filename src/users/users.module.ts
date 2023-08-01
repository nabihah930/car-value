import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],      // This step right here creates the repo. for us
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
