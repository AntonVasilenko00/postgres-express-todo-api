import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToMany,
  BeforeUpdate,
} from 'typeorm'
import bcrypt from 'bcrypt'
import { Todo } from './todo.entity'

export enum UserRole {
  User = 'USER',
  Admin = 'ADMIN',
}

export interface IUser {
  email: string
  password: string
  role?: UserRole
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({ default: UserRole.User })
  role: UserRole

  @OneToMany((type) => Todo, (todo) => todo.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  todos: Todo[]

  @BeforeUpdate()
  @BeforeInsert()
  private async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }

  public isValidPassword = async (password: string): Promise<boolean> =>
    await bcrypt.compare(password, this.password)
}
