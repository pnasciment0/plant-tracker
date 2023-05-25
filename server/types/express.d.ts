interface UserPayload {
    id: string; 
    // add other properties if needed
  }

  declare namespace Express {
    export interface Request {
      user?: UserPayload;  // or whatever the shape of your User object is
    }
  }