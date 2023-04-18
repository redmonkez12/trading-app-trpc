import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { PositionType } from ".prisma/client";

export const positionRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({
      openPrice: z.number(),
      closePrice: z.number(),
      fee: z.number(),
      openTime: z.date(),
      closeTime: z.date(),
      userId: z.string().cuid(),
      assetId: z.string().cuid2(),
      positionSize: z.number(),
      positionType: z.enum([PositionType.LONG, PositionType.SHORT])
    }))
    .mutation(async ({ ctx, input }) => {
      const { openTime, closeTime, closePrice, openPrice, userId, assetId, positionSize, positionType, fee } = input;

      return await ctx.prisma.positions.create({
        data: {
          userId,
          assetId,
          openPrice,
          closePrice,
          positionSize,
          positionType,
          fee,
          closeTime: openTime.toISOString(),
          openTime: closeTime.toISOString()
        }
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
          asset: {
            include: {
              market: true,
            },
          },
        },
      });
    }),

  delete: publicProcedure
    .input(z.object({ positionId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.positions.delete({
        where: {
          id: input.positionId,
        },
      });
    })
});
