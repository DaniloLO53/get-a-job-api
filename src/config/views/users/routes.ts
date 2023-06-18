import { Router } from "express";
import { signIn, signUp } from "./controllers";

const userRoute = Router();

userRoute.post('/api/sign-in', signIn);
userRoute.post('/api/sign-up', signUp);

export default userRoute;
