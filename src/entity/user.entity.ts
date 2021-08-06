import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import jwt from 'jsonwebtoken'
export interface IUser {
  email: string
  encryptedPassword?: boolean
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ nullable: false })
  email: string

  @Column({ nullable: false })
  encrypted_password: string

  @Column({ default: false })
  isCompleted: boolean

  generateJWT() {
    return jwt.sign({
      email: this.email,
      id: this.id,
    })
  }
}
