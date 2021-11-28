import { toast } from "react-toastify";
import { fetchConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";

export const eventStarAddNew = (event) => {
  return async (dispatch, getState) => {

    const { uid, name } = getState().auth;

    try {

      const response = await fetchConToken('events', event, 'POST');
      const body = await response.json();

      if (body.ok) {
        event.id = body.event.id;
        event.user = {
          _id: uid,
          name
        }

        dispatch(eventAddNew(event));
      }

    } catch (error) {
      console.log(error);
    }

  }
}

const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event
})

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event
})

export const eventClearActiveNote = () => ({
  type: types.eventClearActive
})

export const eventUpdated = (event) => ({
  type: types.eventUpdated,
  payload: event
})

export const eventDeleted = () => ({
  type: types.eventDeleted
});

export const eventsStartLoading = () => {
  return async (dispatch) => {
    try {

      const response = await fetchConToken('events');
      const body = await response.json();
      const events = prepareEvents(body.events);
      dispatch(eventsLoaded(events));

    } catch (error) {
      console.log(error)
    }

  }
}

const eventsLoaded = (events) => ({
  type: types.eventLoaded,
  payload: events
})

export const eventStartUpdate = (event) => {
  return async (dispatch) => {
    try {

      const response = await fetchConToken(`events/${event.id}`, event, 'PUT');
      const body = await response.json();

      if (body.ok) {
        dispatch(eventUpdated(event));
      } else {
        return toast.error(body.msg, {
          position: "top-center",
          autoClose: 3000,
          closeOnClick: true,
        });
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const eventStartDelete = () => {
  return async (dispatch, getState) => {
    try {
      const { id } = getState().calendar.activeEvent;
      const response = await fetchConToken(`events/${id}`, {}, 'DELETE');
      const body = await response.json();

      if (body.ok) {
        dispatch(eventDeleted());
      } else {
        return toast.error(body.msg, {
          position: "top-center",
          autoClose: 3000,
          closeOnClick: true,
        });
      }
    } catch (error) {
      console.log(error)
    }
  }
}