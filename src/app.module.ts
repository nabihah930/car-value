import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',     // sqlite is a file based DB i.e. it will store all the info related to the DB inside 1 single file
    database: 'db.sqlite',
    entities: [User, Report],
    synchronize: true   // basically synchronize our entities ti the DB so if entity changes then tyoeorm changes DB accordingly via decorators
  }), UsersModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
