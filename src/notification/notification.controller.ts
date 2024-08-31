// src/notification/notification.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Headers, Delete } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from './entities/entity'; 
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Notification')
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Notification created successfully.',
    type: Notification,
  })
  create(
    @Headers('Authorization') auth: string,
    @Body() createNotificationDto: CreateNotificationDto,
  ) {
    const jwt = auth.replace('Bearer ', '');
    return this.notificationService.create(jwt, createNotificationDto);
  }

  @Get()
  findAll(@Headers('Authorization') auth: string) {
    const jwt = auth.replace('Bearer ', '');
    return this.notificationService.findAll(jwt);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationService.update(+id, updateNotificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationService.remove(+id);
  }
}
