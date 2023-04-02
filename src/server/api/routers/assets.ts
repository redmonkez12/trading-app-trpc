import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const assetsRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ marketId: z.string().cuid2() }))
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.assets.findMany({
        where: {
          marketId: input.marketId,
        },
      });
    }),
});
