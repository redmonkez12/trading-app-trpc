import React from "react";
import { CreateForexPosition } from "~/forms/CreateForexPosition/CreateForexPosition";
import { protectAuthRoute } from "~/protectedRoute";

export default function AddPosition() {

  return (
    <CreateForexPosition />
  );
}

export const getServerSideProps = protectAuthRoute;