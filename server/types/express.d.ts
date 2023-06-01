declare namespace Express {
  interface UserPayload {
    id: string; 
  }

  export interface Request {
    user?: UserPayload; 
  }
}