import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User{

@PrimaryGeneratedColumn('uuid')
id:string ;
@Column({unique: true})
email: string;
@Column({nullable: true})
name:string;
@Column({nullable:true})
picture:string;
}