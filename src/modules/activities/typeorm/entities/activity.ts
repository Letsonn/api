import Boards from "@modules/boards/typeorm/entities/board";
import Employments from "@modules/employments/typeorm/entities/empĺoyment";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
class Activities {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Employments, employment => employment.acitivities)
  @JoinColumn()
  employment: string;

  @ManyToOne(() => Boards, board => board.acitivities)
  @JoinColumn()
  board: string;
}


export default Activities;
