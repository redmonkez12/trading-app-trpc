import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const positionRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({
      openPrice: z.number(),
      closePrice: z.number(),
      openTime: z.date(),
      closeTime: z.date(),
      userId: z.string().cuid(),
      assetId: z.string().cuid2(),
      positionSize: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { openTime, closeTime, closePrice, openPrice, userId, assetId, positionSize } = input;

      return await ctx.prisma.positions.create({
        data: {
          userId,
          assetId,
          openPrice,
          closePrice,
          positionSize,
          closeTime: openTime.toISOString(),
          openTime: closeTime.toISOString(),
        },
      });
    }),

  getAll: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.positions.findMany({
        where: {
          userId: input.userId,
        },
        include: {
          asset: true,
        },
      });
    })
});
