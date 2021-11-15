import React, { FC } from 'react';
import { useEffect } from "react";
import { getRaceStatus } from "../../Store/actions/raceActions";
import { useAppDispatch, useAppSelector } from "../../Store/react-redux-hook";
import { EVENT_TYPE, formatTime, RACE_COMPLETED_MSG, HORSE_RACE_COLUMN, RACE_STATUS_TITLE, RACE_ABOUT_TO_START, ON_GOING, ROUTES } from "../../helpers";
import { HorseEntryTypes, InitialStateType } from "../../types";
import DataTable from "react-data-table-component";
import { Card, CardHeader, CardContent, IconButton } from "@mui/material";
import { icoLoader } from "../../assets";
import localVariable from "../../helpers/LocalVariables.json";
import LogoutIcon from '@mui/icons-material/Logout';
import { useHistory } from 'react-router';

//RaceStatus component props type
export interface RaceProps {
  data: HorseEntryTypes[];
}

const Race: FC = () => {
  // Initialization of Hooks and States
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { race, login } = useAppSelector((state: InitialStateType) => state);
  const { data } = race;

  //Get Race Status on successfull Re-authentication
  useEffect(() => {
    if (login.data?.token) {
      dispatch(getRaceStatus());
    }
  }, [dispatch, login]);

  // Handle logout function
  const logout = () => {
    localStorage.removeItem(localVariable.LOGINDATA)
    history.push(ROUTES.LOGIN); // Redirect to Login page
  }

  //Create column for Race status (No|Horse|Time)
  const columns = [
    {
      name: HORSE_RACE_COLUMN.NO,
      selector: (row: HorseEntryTypes) => row.id,
    },
    {
      name: HORSE_RACE_COLUMN.HORSE,
      selector: (row: HorseEntryTypes) => row.name,
    },
    {
      name: HORSE_RACE_COLUMN.TIME,
      selector: (row: HorseEntryTypes) => row.time,
      format: (row: HorseEntryTypes) => (row.time === 0 ? "" : formatTime(row.time)),
      right: true,
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: '72px', // override the row height
        fontSize: '14px'
      },
    },
    headCells: {
      style: {
        // paddingLeft: '8px', // override the cell padding for head cells
        // paddingRight: '8px',
        fontSize: '16px'
      },
    },
    cells: {
      style: {
        // paddingLeft: '8px', // override the cell padding for data cells
        // paddingRight: '8px',
      },
    },
  };

  // On Race Complition Show Message
  const isRaceCompleted = !data.some((item: HorseEntryTypes) => item.eventType === EVENT_TYPE.START);
  return (
    <div>
      {data.length > 0 ? (
        <div id="race">
          {/* Race completed message */}
          <Card>
            <CardHeader style={{ background: 'rgb(217 217 217)' }}
              action={
                <IconButton aria-label="settings" onClick={logout}>
                  <LogoutIcon />
                </IconButton>
              }
              title={`${RACE_STATUS_TITLE}: ${isRaceCompleted ? RACE_COMPLETED_MSG : ON_GOING}`} />

          </Card>
          <Card style={{ margin: 45 }}>
            <CardContent className="race-card">
              <div >
                <DataTable columns={columns} data={data} pagination customStyles={customStyles} />
              </div>
            </CardContent>
          </Card>
        </div>
      ) :
        <div>
          <div className="newloader-style">
            <div style={{ textAlign: "center" }}>
              <div>
                <img alt={"LoaderImage"} src={icoLoader} />
              </div>
              <div>
                <span className="blink">{RACE_ABOUT_TO_START}</span>
              </div>
            </div>
            <div className="loader-container-inner"></div>
          </div>
        </div>
      }
    </div>
  );
};

export default Race