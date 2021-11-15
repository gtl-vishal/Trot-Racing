import { HorseEntryTypes, RaceResponseType } from "../types";
import { EVENT_TYPE } from "../helpers";

// Comparator to sort status list
export const sortRaceStatus = (data: HorseEntryTypes[]): HorseEntryTypes[] => {
  data.sort((a, b) => a.time - b.time);
  const idx = data.findIndex((o) => o.time > 0);
  const spliceData = data.splice(0, idx);
  return data.concat(spliceData);
};

// To add or update record in status list.
export const updateRaceStatus = (data: HorseEntryTypes[], newRecord: RaceResponseType): HorseEntryTypes[] => {
  const index = data.findIndex((item: HorseEntryTypes) => item.id === newRecord.horse.id);
  if (newRecord.event === EVENT_TYPE.START) {
    if (index !== -1) {
      data[index].time = newRecord.time;
      data[index].eventType = EVENT_TYPE.START;
    } else {
      //Latest Record
      const newHorseDetail = {
        id: newRecord.horse.id,
        name: newRecord.horse.name,
        eventType: newRecord.event,
        time: newRecord.time,
      };
      data = [...data, newHorseDetail];
    }
    const isAnyHorseFinished = data.find((item) => item.time !== 0);
    //Sort Latest Record
    return isAnyHorseFinished ? sortRaceStatus(data) : data;
  } else {
    if (newRecord.horse) {
      data = updateHorseData(data, newRecord, index);
    }
    return sortRaceStatus(data);
  }
};

//Update Horse data for already exists
const updateHorseData = (data: HorseEntryTypes[], newRecord: RaceResponseType, index: number) => {
  if (index !== -1) {
    data[index].time = newRecord.time;
    data[index].eventType = EVENT_TYPE.FINISH;
  }
  return data;
};

// Format time to seconds string value (15,6s)
export const formatTime = (time: number | null): string | 0 | null => {
  const formattedTime = time && `${(time / 1000).toFixed(1)}`.split(".").join(",");
  return formattedTime && `${formattedTime}s`;
};

//Email Validation Function
export const validateEmail = (val: string): boolean => {
  const regexp = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  return regexp.test(val);
};
