import React from "react";
import { icoLoader } from "../../../assets";
import { LoaderType } from "../../../types";

const Loader = (props: LoaderType): JSX.Element => {
  return (
    <>
      {props.loading ? (
        <div>
          <div className="newloader-style">
            <div style={{ textAlign: "center" }}>
              <div>
                <img alt={"LoaderImage"} src={icoLoader} />
              </div>
            </div>
            <div className="loader-container-inner"></div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Loader;
