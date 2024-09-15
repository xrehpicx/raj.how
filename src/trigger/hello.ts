import { logger, task } from "@trigger.dev/sdk/v3";

export const helloWorldTask = task({
  id: "hello-world",
  run: async (payload: any, { ctx }) => {
    logger.log("Hello, world!", { payload, ctx });

    const dir = __dirname;

    return {
      message: "Hello, world!",
      dir,
    };
  },
});
