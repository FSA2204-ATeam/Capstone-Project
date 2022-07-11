import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import preferences from "./userPreferences";
import usersEvents from "./usersEvents";
import sentiment from "./sentimentAnalysis";
//import events from "./events";

const reducer = combineReducers({ auth, preferences, usersEvents, sentiment });
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
export * from "./userPreferences";
export * from "./usersEvents";
export * from "./sentimentAnalysis";
