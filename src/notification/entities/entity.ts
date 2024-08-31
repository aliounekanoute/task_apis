// src/notification/entities/notification.entity.ts
import { Column, Model, Table, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';

@Table
export class Notification extends Model<Notification> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
      title: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  body: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date: Date;
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isRead: boolean;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;
}
