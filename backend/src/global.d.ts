// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Request } from 'express';

declare module 'express' {
  interface Request {
    user?: {
      id: number;
      username: string;
      roleId: number;
      role: {
        id: number;
        name: string;
      };
    };
  }
}
