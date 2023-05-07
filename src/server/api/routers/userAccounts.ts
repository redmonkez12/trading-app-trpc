import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { Currency, Mode, UserAccount } from "@prisma/client";

export const userAccountsRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({
      userId: z.string().cuid(),
      mode: z.enum([Mode.DARK, Mode.LIGHT]),
      currency: z.enum([
        Currency.AUD,
        Currency.CAD,
        Currency.BTC,
        Currency.CHF,
        Currency.USD,
        Currency.CZK,
        Currency.EUR,
        Currency.EUR,
        Currency.JPY,
        Currency.GBP,
        Currency.NZD,
        Currency.PLN,
      ]),
      money: z.number(),
      default: z.boolean()
    }))
    .mutation(async ({ input, ctx }) => {
      const { userId, default: defaultAccount, currency, money, mode } = input;

      return await ctx.prisma.userAccount.create({
        data: {
          userId,
          default: defaultAccount,
          mode,
          money,
          currency
        },
      });
    }),

  get: publicProcedure
    .input(z.object({
      userId: z.string().cuid(),
      accountId: z.string().cuid().optional(),
    }))
    .query<UserAccount>(async ({ input, ctx }) => {
      const { userId, accountId } = input;

      if (!accountId) {
        return await ctx.prisma.userAccount.findFirstOrThrow({
          where: {
            userId,
            default: true,
          },
        });
      }

      return await ctx.prisma.userAccount.findFirstOrThrow({
        where: {
          userId,
          id: accountId,
        },
      });
    }),
});
