import React, { useEffect } from "react";
import { applicationStarted } from "@/app/model/application";
import { Router } from "@/app/components/router";
import { useStore } from "effector-react";
import { $transport } from "@/app/model/transport";
import { Animation, HalfCircle } from "@/ui";
import { appRoutes } from "@/app/components/app/routes";

export const App = () => {
  const transport = useStore($transport);
  useEffect(() => applicationStarted(), []);

  return (
    <>
      {transport.errors.map((error) => error)}
      {transport.fetching && (
        <div style={{ position: "fixed", top: 0, left: 0 }}>
          <Animation type={"rotate"} infinite>
            <HalfCircle />
          </Animation>
        </div>
      )}
      <Router routes={appRoutes} />
    </>
  );
};
