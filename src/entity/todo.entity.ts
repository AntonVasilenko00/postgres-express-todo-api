import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  JoinTable,
} from 'typeorm'
import { User } from './user.entity'

export interface ITodo {
  userID: number
  text: string
  isCompleted?: boolean
}

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  text: string

  @Column({ default: false })
  isCompleted: boolean

  @Column({ name: 'userID' })
  userID: number

  @ManyToOne((type) => User, (user) => user.todos, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userID' })
  user: User
}
