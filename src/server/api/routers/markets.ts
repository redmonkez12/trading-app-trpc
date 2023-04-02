import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const marketsRouter = createTRPCRouter({
  getAll: publicProcedure
    .query(async ({ ctx }) => {
      return await ctx.prisma.markets.findMany();
    }),
});
