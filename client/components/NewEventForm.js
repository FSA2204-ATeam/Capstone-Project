import React, { useState, useEffect } from 'react';
import FormInput from './FormInput';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { addUserDefinedEvent } from '../store';
import { useDispatch } from 'react-redux';
import {
  Button,
  Popover,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  Paper,
} from '@material-ui/core';

export const NewEventForm = (latLng) => {
  const [toggleOpen, setToggleOpen] = useState(!!latLng.position.lat);

  useEffect(() => {}, [latLng]);

  const [values, setValues] = useState({
    name: '',
    shortDesc: '',
    eventLat: latLng.position.lat,
    eventLng: latLng.position.lng,
  });

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const inputs = [
    {
      id: 1,
      name: 'name',
      type: '',
      placeholder: 'Title',
      errorMessage: 'Title should be 2-50 characters long!',
      label: 'title',
      pattern: `^[ a-zA-Z0-9!@#$%^&*?,.:;\\-\\()""'']{3,50}$`,
      required: true,
    },
    {
      id: 2,
      name: 'shortDesc',
      type: 'text',
      placeholder: 'Description',
      errorMessage: 'Description should be 3-1024 characters!',
      label: 'description',
      pattern: `^[ a-zA-Z0-9!@#$%^&*?,.:;\\-\\()""'']{3,1024}$`,
      required: true,
    },
  ];

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEvent = { ...values, startDate, endDate };
    dispatch(addUserDefinedEvent(newEvent, submissionFeedback));
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  //EVENT SUBMIT FEEDBACK
  const [successfulEvt, setSuccessfulEvt] = useState(false);
  const submissionFeedback = () => {
    setSuccessfulEvt(true);
  };

  return (
    <div align="center">
      {toggleOpen ? (
        <form onSubmit={handleSubmit}>
          <h1 style={{fontFamily: "Shrikhand"}}>Add your Event!</h1>
          {inputs.map((input) => (
            <FormInput
              toggleOpen={toggleOpen}
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <p>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateTimePicker
                label="Event starts"
                color="#F9DB53"
                value={startDate}
                onChange={setStartDate}
              />
            </MuiPickersUtilsProvider>
          </p>
          <p>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateTimePicker
                label="Event ends"
                color="#F9DB53"
                value={endDate}
                onChange={setEndDate}
              />
            </MuiPickersUtilsProvider>
          </p>
          <p>
            {successfulEvt ?
            (<Button
              type={'submit'}
              style={{
                backgroundColor: '#F9DB53',
                padding: '5px 0px',
                fontSize: '10px',
              }}
            >
              Submitted!
            </Button>
            ) : (
            <Button
              type={'submit'}
              style={{
                backgroundColor: '#F5F5F5',
                padding: '5px 0px',
                fontSize: '10px',
              }}
            >
              Submit
            </Button>)
            }
          </p>
        </form>
      ) : null}
    </div>
  );
};
