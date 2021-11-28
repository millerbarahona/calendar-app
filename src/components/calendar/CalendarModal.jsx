import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import Datetime from 'react-datetime';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';

import "react-datetime/css/react-datetime.css";
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventStarAddNew, eventClearActiveNote, eventStartUpdate  } from '../../actions/events';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1 = now.clone().add(15, 'minutes');

const initEvent = {
  title: '',
  notes: '',
  start: now.toDate(),
  end: nowPlus1.toDate()
}

export const CalendarModal = () => {

  const [dateStart, setDateStart] = useState(now);
  const [dateEnd, setDateEnd] = useState(nowPlus1);
  const [titleIsValid, setTitleIsValid] = useState(true);
  const [formValues, setFormValues] = useState(initEvent)
  const { modalOpen } = useSelector(state => state.ui);
  const { activeEvent } = useSelector(state => state.calendar);
  const dispatch = useDispatch();

  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent);
    } else {
      setFormValues(initEvent)
    }
  }, [activeEvent, setFormValues])

  const { notes, title, start, end } = formValues;

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }

  function valid(current) {
    const momentStart = moment(start);
    return current.isSameOrAfter(momentStart.subtract(1, 'days').toDate());

  }

  const closeModal = () => {
    dispatch(uiCloseModal());
    setFormValues(initEvent)
    dispatch(eventClearActiveNote())
  }

  const handleStartDateChange = (e) => {
    setDateStart(e);
    setFormValues({
      ...formValues,
      start: e.toDate()
    })
  }

  const handleEndDateChange = (e) => {
    setDateEnd(e);
    setFormValues({
      ...formValues,
      end: e.toDate()
    })
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const momentStart = moment(start);
    const momentEnd = moment(end);

    if (momentStart.isAfter(momentEnd)) {
      return toast.error('Las fechas deben ser validas!', {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
      });
    }

    if (title.trim() < 2) {
      setTitleIsValid(false);
      return toast.error('Debes ingresar un titulo!', {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
      });
    }
    if (activeEvent) {
      dispatch(eventStartUpdate(formValues))
    } else {
      dispatch(eventStarAddNew(formValues))
    }
    setTitleIsValid(true);
    closeModal();

  }

  return (
    <Modal
      isOpen={modalOpen}
      // onAfterClose={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      contentLabel="Example Modal"
      className="modal"
      overlayClassName="modal-fondo"
    >
      
      <h1> {(activeEvent) ? 'Editar Evento' : 'Nuevo evento'} </h1>
      <hr />
      <form
        className="container"
        onSubmit={handleSubmitForm}
      >

        <div className="form-group">
          <label>Fecha y hora inicio {dateStart.toDate().toDateString()}</label>
          <Datetime
            initialValue={dateStart}
            timeFormat
            onChange={handleStartDateChange}
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <Datetime
            initialValue={dateEnd}
            timeFormat
            onChange={handleEndDateChange}
            isValidDate={valid}
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${!titleIsValid && 'is-invalid'}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">Información adicional</small>
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary btn-block"
        >
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>

      </form>
    </Modal>
  )
}
