import React from "react";
import { useRouter } from "next/router";

import { CreateForexPosition } from "~/forms/CreateForexPosition/CreateForexPosition";
import { protectAuthRoute } from "~/protectedRoute";
import { api } from "~/utils/api";
import { CreatePosition } from "~/forms/CreatePosition/CreatePosition";
import { withLayout } from "~/layouts/Layout";

function AddPosition() {
  const router = useRouter();
  const { marketId = "", assetId = "" } = router.query;
  const { data: asset = null } = api.assets.get.useQuery({ assetId: assetId as string });

  return (
    asset?.market?.name === "FOREX"
      ? <CreateForexPosition marketId={marketId as string} asset={asset}/>
      : <CreatePosition marketId={marketId as string} asset={asset}/>
  );
}

export default withLayout(AddPosition);

export const getServerSideProps = protectAuthRoute;