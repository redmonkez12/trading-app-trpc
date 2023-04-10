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
EXTRACT(MONTH FROM date_trunc('month', "public"."Positions"."closeTime")::date) AS month,
SUM(("public"."Positions"."closePrice" - "public"."Positions"."openPrice") * "public"."Positions"."positionSize") AS "profitLoss"
FROM "public"."Positions"
WHERE "public"."Positions"."userId" = ${input.userId}
GROUP BY month`);

      // return await ctx.prisma.positions.groupBy({
      //   by: ['date_trunc("month", closeTime)'],
      //   where: {
      //     userId: input.userId,
      //   },
      // });
    })
});
