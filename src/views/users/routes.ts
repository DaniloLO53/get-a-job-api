import { auth } from "@/middlewares/auth";
import { Router } from "express";
import { signIn, signUp, showProfile } from "./controllers";

const userRoute = Router();

userRoute.post('/api/sign-in', signIn);
userRoute.post('/api/sign-up', signUp);
userRoute.get('/profile', auth, showProfile);

export default userRoute;
