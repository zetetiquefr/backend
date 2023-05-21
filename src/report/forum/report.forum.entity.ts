import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinTable,
  Column,
} from 'typeorm';
import { Forum } from 'src/forum/forum.entity';
import { User } from 'src/user/user.entity';

export enum ReportForumStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

@Entity()
export class ReportForum {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ManyToOne(() => Forum, (forum) => forum.reports)
  @JoinTable()
  forum: Forum;

  @Column({
    nullable: false,
  })
  content: string;

  @ManyToOne(() => User, (user) => user.reportsForum)
  @JoinTable()
  creator: User;

  @Column({
    default: false,
  })
  archived: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'enum',
    enum: ReportForumStatus,
    default: ReportForumStatus.PENDING,
  })
  status: ReportForumStatus;
}
