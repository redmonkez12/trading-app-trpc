import { getSession } from "next-auth/react";
import { prisma } from "~/server/db";
import { type GetServerSidePropsContext } from "next";

export async function protectAuthRoute(context: GetServerSidePropsContext) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const { id: userId } = session.user;
  const userSettings = await prisma.userSettings.findFirst({ where: { userId }})
  if (!userSettings) {
    const currentPath = context.resolvedUrl;

    if (currentPath.includes("create-account")) {
      return { props: {} };
    }

    return {
      redirect: {
        destination: "/create-account",
        permanent: false,
      },
    };
  }

  return { props: { user: session.user } };
}


export async function protectRoute(context: GetServerSidePropsContext) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const session = await getSession(context);
  if (session) {
    const { id: userId } = session.user;
    const userSettings = await prisma.userSettings.findFirst({ where: { userId }})
    const currentPath = context.resolvedUrl;

    if (!userSettings) {
      if (currentPath.includes("create-account")) {
        return { props: {} };
      }

      return {
        redirect: {
          destination: "/create-account",
          permanent: false,
        },
      };
    }


    return {
      redirect: {
        destination: "/markets",
        permanent: false,
      },
    };
  }

  return { props: {} };
}