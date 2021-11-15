import React, { FC, useEffect } from "react";
import "./App.css";
import { Loader, NoInternet } from "./Components/common";
import Navigation from "./Navigation";
import { useAppDispatch, useAppSelector } from "./Store/react-redux-hook";
import { InitialStateType } from "./types";
import { connectionOnline, connectionOffline } from "./Store/actions/global";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: FC = () => {
  const { global } = useAppSelector((state: InitialStateType) => state); //redux-state
  const dispatch = useAppDispatch();

  useEffect(() => {
    //Add event lister to check internet availability
    window.addEventListener("online", () => {
      dispatch(connectionOnline());
    });
    window.addEventListener("offline", () => {
      dispatch(connectionOffline());
    });
  }, [dispatch]);

  return (
    <>
      {global.online ? (
        <>
          <Navigation />
          {/* Common Loader component */}
          <Loader loading={global.loading} />
          <ToastContainer />
        </>
      ) : (
        <NoInternet />
      )}
    </>
  );
};

export default App;
