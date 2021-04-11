import Router from "koa-router";
import { triggerRouter } from "./modules/triger/trigger.routes";

const apiRouter = new Router();

apiRouter.use("/triggerRouter", triggerRouter.routes());

export default apiRouter;
