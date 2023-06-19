import { SessionData } from 'express-session';

export interface CustomSession extends SessionData {
    userId: number;
    username: string;
    email: string;
}

