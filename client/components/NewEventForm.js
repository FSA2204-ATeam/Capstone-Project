import React, { useState, useEffect } from "react";
import FormInput from "./FormInput";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { addUserDefinedEvent } from "../store";
import { useDispatch } from "react-redux";

export const NewEventForm = (latLng) => {
  const [values, setValues] = useState({
    name: "",
    shortDesc: "",
    eventLat: latLng.position.lat,
    eventLng: latLng.position.lng,
  });

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "",
      placeholder: "Title",
      errorMessage: "Title should be 2-50 characters long!",
      label: "title",
      pattern: "^[]{2,50}$",
      required: true,
    },
    {
      id: 2,
      name: "shortDesc",
      type: "text",
      placeholder: "Description",
      errorMessage: "Description should be 3-1024 characters!",
      label: "description",
      pattern: "^[]{3,1024}$",
      required: true,
    },
  ];

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEvent = { ...values, startDate, endDate };
    dispatch(addUserDefinedEvent(newEvent));
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>New Event Form</h1>
        {inputs.map((input) => (
          <FormInput
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
              value={startDate}
              onChange={setStartDate}
            />
          </MuiPickersUtilsProvider>
        </p>
        <p>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              label="Event ends"
              value={endDate}
              onChange={setEndDate}
            />
          </MuiPickersUtilsProvider>
        </p>
        <p>
          <button>Submit</button>
        </p>
      </form>
    </div>
  );
};
