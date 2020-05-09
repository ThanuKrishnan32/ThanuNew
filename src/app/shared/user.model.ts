import { Skill } from './skill.model';

export interface User{
    id: number;
    userId: string;
    password: string,
    firstName: string,
    lastName: string,
    team: string,
    skills: Skill[]
}