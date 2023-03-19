import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const marketsRouter = createTRPCRouter({
  getAll: publicProcedure
    .query(({ ctx }) => {
      return ctx.prisma.market.findMany();
    }),
});
