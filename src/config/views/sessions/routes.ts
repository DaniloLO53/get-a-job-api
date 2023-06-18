import { Router } from "express";
import { googleOauthHandler } from "./controllers";

const sessionRoute = Router();

sessionRoute.get('/api/sessions/oauth/google', googleOauthHandler);

export default sessionRoute;
