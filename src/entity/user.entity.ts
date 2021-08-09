import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm'
import * as bcrypt from 'bcrypt'
export interface IUser {
  email: string
  password: string
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @BeforeInsert()
  private async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }

  public isValidPassword = async (password: string): Promise<boolean> =>
    await bcrypt.compare(password, this.password)
}
