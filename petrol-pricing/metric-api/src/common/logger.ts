import pino from "pino";

const hooks = {
    logMethod(inputArgs: any, method: any): any {
        if (inputArgs.length >= 2) {
            const arg1 = inputArgs.shift();
            const arg2 = inputArgs.shift();
            return method.apply(this, [arg2, arg1, ...inputArgs]);
        }
        return method.apply(this, inputArgs);
    },
};

export const logger = pino({
    name: "task-2",
    level: process.env.DEBUG_LEVEL || "debug",
    hooks,
} as any);
