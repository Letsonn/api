import Activities from "@modules/activities/typeorm/entities/activity";
import Projects from "@modules/boards/typeorm/entities/board";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
class Boards {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Projects, project => project.project)
  @JoinColumn()
  project: string

  @OneToMany(() => Activities, activity => activity.board)
  acitivities: Activities[];

}

export default Boards;
