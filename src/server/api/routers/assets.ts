import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const assetsRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({
      marketId: z.string().cuid2(),
      offset: z.number(),
      limit: z.number(),
      search: z.string(),
    }))
    .query(async ({ input, ctx }) => {
      const { marketId, offset, limit, search } = input;

      return await ctx.prisma.assets.findMany({
        where: {
          marketId: marketId,
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        skip: offset,
        take: limit,
      });
    }),

  count: publicProcedure
    .query(async ({ ctx }) => {
      return await ctx.prisma.assets.count();
    }),
});
