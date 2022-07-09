import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";

const MyEvents = (props) => {
  //   useEffect(() => {
  //     setUsersEvents();
  //   });

  console.log("State--->", state);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>{`${props.userProfile.username}'s profile`}</h1>
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
                      ? "categoryButton Selected"
                      : "categoryButton"
                  }
                  onClick={() => handleCatSelect(category)}
                >
                  {category.slice(4)}
                </button>
              ))
            : null}
        </div>
        <button>Update</button>
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
