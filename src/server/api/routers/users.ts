import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({
      userId: z.string().cuid(),
    }))
    .query(async ({ input, ctx }) => {
      const { userId } = input;

      return await ctx.prisma.user.findFirst({
        where: {
          id: userId,
        },
      });
    }),
});
