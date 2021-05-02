import { Expose } from "class-transformer";
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity('users')
class User {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column({})
  password: string

  @Column({ nullable: true })
  avatar?: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @Expose({ name: "avatar_url" })
  avatar_url(): string {
    return `${process.env.APP_API_URL}/avatar/${this.avatar}` || `${process.env.APP_API_URL}/avatar/default.png`;
  }

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { User }