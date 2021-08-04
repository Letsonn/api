import Projects from "@modules/projects/typeorm/entities/projects";
import Users from "@modules/users/typeorm/entities/user";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "../enum/employmentEnum";



@Entity()
class Employments {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    type: 'enum',
    enum: Role
  })
  role: Role;

  @ManyToOne(() => Users, user => user.employments)
  @JoinColumn()
  user: string;

  @ManyToOne(() => Projects, project => project.employments)
  @JoinColumn()
  project: string


}

export default Employments;
