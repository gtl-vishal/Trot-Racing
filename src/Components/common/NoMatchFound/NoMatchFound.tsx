import React from "react";
import { NO_MATCH_FOR } from "../../../helpers";

const NoMatchFound = (): JSX.Element => {

  return (
    <div id="nomatch">
      <h3>
        {NO_MATCH_FOR}
      </h3>
    </div>
  );
};

export default NoMatchFound;
