import { createTRPCRouter } from "~/server/api/trpc";
import { marketsRouter } from "~/server/api/routers/markets";
import { assetsRouter } from "~/server/api/routers/assets";
import { userRouter } from "~/server/api/routers/users";
import { positionRouter } from "~/server/api/routers/positions";
import { statisticsRouter } from "~/server/api/routers/statistics";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  markets: marketsRouter,
  assets: assetsRouter,
  users: userRouter,
  positions: positionRouter,
  statistics: statisticsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
