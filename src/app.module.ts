import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { dataBaseConfig } from './database.config';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [TaskModule, SequelizeModule.forRoot(dataBaseConfig),
    NotificationModule,
  ],
  //controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
