// src/notification/notification.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Notification } from './entities/entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/utils/constant';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification)
    private notificationRepository: typeof Notification,
    private jwtService: JwtService,
  ) {}

  create(jwt: string, createNotificationDto: CreateNotificationDto) {
    try {
      const user = this.jwtService.verify(jwt, {
        secret: jwtConstants.secret,
      });
      const userId = user.sub;
      return this.notificationRepository.create({ ...createNotificationDto, userId });
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  findAll(jwt: string) {
    try {
      const user = this.jwtService.verify(jwt, {
        secret: jwtConstants.secret,
      });
      const userId = user.sub;
      return this.notificationRepository.findAll({ where: { userId } });
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  findOne(id: number) {
    return this.notificationRepository.findOne({ where: { id } });
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    const condition = { where: { id } };
    this.notificationRepository.update(updateNotificationDto, condition);
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.notificationRepository.destroy({ where: { id } });
    return result > 0;
  }
}
