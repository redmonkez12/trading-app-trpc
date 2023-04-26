import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const countriesRouter = createTRPCRouter({
  getAll: publicProcedure
    .query(async ({ ctx }) => {
      return await ctx.prisma.countries.findMany();
    }),
});
