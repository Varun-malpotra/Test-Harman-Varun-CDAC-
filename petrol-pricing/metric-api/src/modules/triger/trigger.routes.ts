import Router from "koa-router";
import { publishMessageOnRequest } from "./trigger.controller";

const triggerRouter = new Router();

triggerRouter.post("/", publishMessageOnRequest);
export { triggerRouter };
