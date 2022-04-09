import { Provider } from "react-redux";
import "../styles/globals.css";
import { createStore } from "redux";
import { loginReducer } from "../redux/reducers/loginReducer";

const loginStore = createStore(loginReducer);

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={loginStore}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
