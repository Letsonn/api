import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Activities {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  status: string;


}
