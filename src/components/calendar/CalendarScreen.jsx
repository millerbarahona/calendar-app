import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { NavBar } from '../ui/NavBar';
import { messages } from '../../helpers/calendar-messages';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import { useDispatch } from 'react-redux';
import { eventClearActiveNote, eventSetActive, eventsStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/addNewFab';
import { useSelector } from 'react-redux';
import { DeleteEventFab } from '../ui/DeleteEventFab';
import { ToastContainer } from 'react-toastify';

moment.locale('es');
const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector(state => state.calendar);
  const { uid } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(eventsStartLoading());
  }, [dispatch])

  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  }

  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e));
  }

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem('lastView', e);
  }

  const onSelectSlot = (e) => {
    //TODO: hacer el evento de dar click en una franja de tiempo y abrir el modal con las respectivas horas que devuelve el event
    dispatch(eventClearActiveNote())
  }

  const eventStyleGetter = (event, start, end, isSelected) => {

    const style = {
      backgroundColor: (uid === event.user._id) ? '#367CF7' : '#465660',
      borderRadius: '0px',
      opacity: '0.8',
      display: 'block',
      color: 'white'
    }

    return {
      style
    }
  }

  return (
    <div className="calendar-screen">
      <NavBar />
      <ToastContainer
        position="top-left"
        autoClose={1000}
      />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor={"start"}
        endAccessor={"end"}
        messages={messages}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        onSelectSlot={onSelectSlot}
        selectable={true}
        view={lastView}
      />
      <AddNewFab />
      {activeEvent && <DeleteEventFab />}
      <CalendarModal />
    </div>
  )
}
