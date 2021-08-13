import Boards from "@modules/boards/typeorm/entities/board";
import Employments from "@modules/employments/typeorm/entities/empĺoyment";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
class Projects {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Employments, employment => employment.project)
  employments: Employments;

  @OneToMany(() => Boards, board => board.project)
  boards: Boards;
}

export default Projects;
