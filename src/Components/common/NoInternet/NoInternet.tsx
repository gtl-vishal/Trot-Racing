import React, { FC } from "react";
import { OFFLINE } from "../../../helpers";
const NoInternet: FC = () => {
  return (
    <div id="no-internet">
      <h1>{OFFLINE}</h1>
    </div>
  );
};

export default NoInternet;
