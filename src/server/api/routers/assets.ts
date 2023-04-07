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
          marketId,
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        orderBy: {
          ticker: "asc",
        },
        skip: offset,
        take: limit,
      });
    }),

  get: publicProcedure
    .input(z.object({
      assetId: z.string().cuid2(),
    }))
    .query(async ({ ctx, input }) => {
      const { assetId } = input;

      return await ctx.prisma.assets.findFirst({
        where: {
          id: assetId,
        },
      });
    }),

  count: publicProcedure
    .input(z.object({
      marketId: z.string().cuid2(),
    }))
    .query(async ({ ctx, input }) => {
      const { marketId } = input;

      return await ctx.prisma.assets.count({
        where: {
          marketId,
        },
      });
    }),
});
