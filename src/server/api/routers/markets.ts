import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const marketsRouter = createTRPCRouter({
  getAll: publicProcedure
    .query(async ({ ctx }) => {
      return await ctx.prisma.markets.findMany();
    }),

  get: publicProcedure
    .input(z.object({ id: z.string().cuid2() }))
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.markets.findFirstOrThrow({
        where: {
          id: input.id,
        },
      });
    })
});
