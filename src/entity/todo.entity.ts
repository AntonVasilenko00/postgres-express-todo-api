import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

export interface ITodo {
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
}
