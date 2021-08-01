import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  BeforeRemove,
} from 'typeorm';

import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id: ', this.id);
  }
  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with id: ', this.id);
  }
  @BeforeRemove()
  logRemove() {
    console.log('Removed User with id: ', this.id);
  }
}
