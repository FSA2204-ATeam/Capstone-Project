import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import FormInput from './FormInput';
import { updateProfile } from '../store/auth';
import { updatePreferences } from '../store/userPreferences';
import axios from 'axios';
import { Button } from '@material-ui/core';

const UserProfileForm = (props) => {
  const [values, setValues] = useState({
    username: props.userProfile.username || '',
    email: props.userProfile.email || '',
    firstname: props.userProfile.firstname || '',
    lastname: props.userProfile.lastname || '',
  });

  const [categoryPreferences, setCategoryPreferences] = useState(
    props.userPreferences
  );

  useEffect(() => {
    setValues({
      username: props.userProfile.username || '',
      email: props.userProfile.email || '',
      firstname: props.userProfile.firstname || '',
      lastname: props.userProfile.lastname || '',
    });
  }, [props.userProfile]);

  useEffect(() => {
    setCategoryPreferences(
      Object.keys(props.userPreferences)
        .filter((key) => key.includes('CAT_'))
        .reduce((obj, key) => {
          return Object.assign(obj, {
            [key]: props.userPreferences[key],
          });
        }, {})
    );
  }, [props.userPreferences]);

  const inputs = [
    {
      id: 1,
      name: 'username',
      type: 'text',
      placeholder: 'username',
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: 'Username',
      pattern: '^[A-Za-z0-9]{3,16}$',
      required: true,
    },
    {
      id: 2,
      name: 'email',
      type: 'email',
      placeholder: 'email',
      errorMessage: 'It should be a valid email address!',
      label: 'Email',
      required: true,
    },
    {
      id: 3,
      name: 'firstname',
      type: 'text',
      placeholder: 'First Name',
      errorMessage: 'First name should be 1-16 characters!',
      label: 'First Name',
      pattern: '^[A-Za-z0-9]{1,16}$',
      required: true,
    },
    {
      id: 4,
      name: 'lastname',
      type: 'text',
      placeholder: 'Last Name',
      errorMessage: 'Last name should be 1-16 characters!',
      label: 'Last Name',
      pattern: '^[A-Za-z0-9]{1,16}$',
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = window.localStorage.getItem('token');
    if (token) {
      const userRes = await axios.put('api/users/updateProfile', values, {
        headers: {
          authorization: token,
        },
      });
      const prefsRes = await axios.put(
        'api/users/preferences',
        categoryPreferences,
        {
          headers: {
            authorization: token,
          },
        }
      );
      if (userRes.status === 200 && prefsRes.status === 200) {
        updtSubmissionFeedback();
      }
      props.updateState(userRes.data, prefsRes.data);
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCatSelect = (category) => {
    setCategoryPreferences({
      ...categoryPreferences,
      [category]: !categoryPreferences[category],
    });
  };

  //UPDATE SUBMIT FEEDBACK
  const [successfulUpdt, setSuccessfulUpdt] = useState(false);
  const updtSubmissionFeedback = () => {
    setSuccessfulUpdt(true);
  };

  return (
    <div align="center">
      <form onSubmit={handleSubmit}>
        <h1
          align="center"
          style={{ fontFamily: 'Shrikhand' }}
        >{`${props.userProfile.username
          .slice(0, 1)
          .toUpperCase()}${props.userProfile.username.slice(1)}'s Profile`}</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <div>
          {categoryPreferences
            ? Object.keys(categoryPreferences).map((category, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={
                    categoryPreferences[category]
                      ? 'categoryButton Selected'
                      : 'categoryButton'
                  }
                  onClick={() => handleCatSelect(category)}
                >
                  {category.slice(4)}
                </button>
              ))
            : null}
        </div>
        <p>
          {successfulUpdt ? (
            <Button
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
            </Button>
          )}
        </p>
      </form>
    </div>
  );
};

const mapState = (state) => {
  return {
    userProfile: state.auth,
    userPreferences: state.preferences,
    //usersEvents: state.usersEvents,
  };
};

const mapDispatch = (dispatch) => {
  return {
    updateState(user, prefs) {
      dispatch(updateProfile(user));
      dispatch(updatePreferences(prefs));
    },
  };
};

export default connect(mapState, mapDispatch)(UserProfileForm);
