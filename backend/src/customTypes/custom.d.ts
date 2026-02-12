// No imports at top unless needed
import "express";
import "socket.io";

declare module "express-serve-static-core" {
  interface Request {
    user;
  }
}

declare module "socket.io" {
  interface Socket {
    user;
  }
}
