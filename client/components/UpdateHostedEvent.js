import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "./FormInput";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { updateUserDefinedEvent } from "../store/events";
import { setUserEvents } from "../store/usersEvents";
import { Button } from "@material-ui/core";

export const UpdateHostedEvent = ({ event }) => {
  const user = useSelector((state) => state.auth);
  const [values, setValues] = useState({
    name: event.name,
    shortDesc: event.shortDesc,
  });
  const [startDate, setStartDate] = useState(event.startDate);
  const [endDate, setEndDate] = useState(event.endDate);

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "",
      placeholder: "Title",
      errorMessage: "Title should be 2-50 characters long!",
      label: "title",
      pattern: `^[ a-zA-Z0-9!@#$%^&*?,.:;\\-\\()""'']{3,50}$`,
      required: true,
    },
    {
      id: 2,
      name: "shortDesc",
      type: "text",
      placeholder: "Description",
      errorMessage: "Description should be 3-1024 characters!",
      label: "description",
      pattern: `^[ a-zA-Z0-9!@#$%^&*?,.:;\\-\\()""'']{3,1024}$`,
      required: true,
    },
  ];

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEvent = { ...values, startDate, endDate, id: event.id };
    dispatch(updateUserDefinedEvent(newEvent, user.id, updateFeedback));
  };

  const onChange = (e) => {
    setSuccessfulUpdate(false);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [successfulUpdate, setSuccessfulUpdate] = useState(false);
  const updateFeedback = () => {
    setSuccessfulUpdate(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Update Event Form</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              label="Event starts"
              value={startDate}
              onChange={setStartDate}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              label="Event ends"
              value={endDate}
              onChange={setEndDate}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div>
          {successfulUpdate ? (
            <Button
              type={"submit"}
              style={{
                backgroundColor: "#F9DB53",
                padding: "5px 0px",
                fontSize: "10px",
              }}
            >
              Updated!
            </Button>
          ) : (
            <Button
              type={"submit"}
              style={{
                backgroundColor: "#F5F5F5",
                padding: "5px 0px",
                fontSize: "10px",
              }}
            >
              Update
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UpdateHostedEvent;
