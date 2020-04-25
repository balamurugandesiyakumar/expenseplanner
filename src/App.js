import React from 'react';
import Routes from "./Routes";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import expReducer from "./reducers/index";
import "./common.scss";
const store = createStore(expReducer);

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
