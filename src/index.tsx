import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import rootReducer from "./store";
import theme from "./theme";
import createSagaMW from "redux-saga";
import RootSaga from "./store/saga";
import { getToken } from "./store/auth/actions";
import { BrowserRouter as Router } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";
import AlertListener from "./containers/common/AlertListener";

const sagaMW = createSagaMW();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMW))
);
sagaMW.run(RootSaga);
store.dispatch(getToken());

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <Router>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <AlertListener />
        <ScrollToTop />
        <App />
      </Router>
    </ChakraProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
