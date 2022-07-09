import React, { useState, useEffect } from 'react';
import FormInput from './FormInput';

export const NewEventForm = () => {
  const [values, setValues] = useState({
    title: '',
    email: '',
    birthday: '',
    password: '',
    confirmPassword: '',
  });

  const inputs = [
    {
      id: 1,
      name: 'title',
      type: 'text',
      placeholder: 'Title',
      errorMessage: 'Title should be 3-200 characters long!',
      label: 'title',
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 2,
      name: 'description',
      type: 'text',
      placeholder: 'Description',
      errorMessage: 'Description should be 3-1024 characters!',
      label: 'description',
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 3,
      name: 'start',
      type: 'date',
      placeholder: 'Start',
      label: 'DateTimePicker',
    },
    {
      id: 4,
      name: 'end',
      type: 'time',
      placeholder: 'End',
      label: 'endDate',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
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
        <button>Submit</button>
      </form>
    </div>
  );
};
