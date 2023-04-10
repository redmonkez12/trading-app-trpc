import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { Prisma } from ".prisma/client";
import sql = Prisma.sql;

export type PerMonth = {
  month: number;
  profitLoss: number;
};

export const statisticsRouter = createTRPCRouter({
  getByMonth: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.$queryRaw<PerMonth[]>(sql`
        SELECT
        EXTRACT(MONTH FROM date_trunc('month', p."closeTime")::date) AS month,
        SUM((p."closePrice" - p."openPrice") * p."positionSize") AS "profitLoss"
        FROM "public"."Positions" AS p
        WHERE p."userId" = ${input.userId}
        GROUP BY month
      `);
    })
});
