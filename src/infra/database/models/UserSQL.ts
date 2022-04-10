import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn, OneToMany } from "typeorm";
import Appraisal from "./Appraisal";

@Entity("users")
export default class UserSQL {
    @PrimaryColumn()
    public readonly id: string;

    @Column()
    public password: string;

    @Column()
    public email: string;

    @Column()
    public first_name: string;

    @Column()
    public last_name: string;

    @Column()
    public role: string;

    @Column({ nullable: true })
    public forgot_token: string | null;

    @Column({ nullable: true })
    public confirm_link: string | null;

    @CreateDateColumn()
    public created_at: Date;

    @UpdateDateColumn({ nullable: true })
    public updated_at: Date | null;

    /**
     * Relations
     */
    @OneToMany(() => Appraisal, appraisal => appraisal.creator)
    public appraisals: Appraisal;
}