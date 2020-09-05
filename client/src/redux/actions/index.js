import {
  GREENHOUSES_LOADED,
  GREENHOUSE_DELETE,
  GREENHOUSES_EDITED,
} from "./actionTypes";

const greenhousesLoaded = (allGreenhouses) => {
  return {
    type: GREENHOUSES_LOADED,
    payload: allGreenhouses,
  };
};

const greenhouseDelete = (id) => {
  return {
    type: GREENHOUSE_DELETE,
    payload: id,
  };
};

const greenhouseEdited = (id) => {
  return {
    type: GREENHOUSES_EDITED,
    payload: id,
  };
};

export { greenhousesLoaded, greenhouseDelete, greenhouseEdited };
