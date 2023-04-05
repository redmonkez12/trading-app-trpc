import { getSession } from "next-auth/react";

export async function protectAuthRoute(context: never) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return { props: {} };
}


export async function protectRoute(context: never) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/markets",
        permanent: false,
      },
    };
  }
  return { props: {} };
}