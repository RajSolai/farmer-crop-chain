import { Provider } from "react-redux";
import "../styles/globals.css";
import { combineReducers, createStore } from "redux";
import { pricesReducer } from "../redux/reducers/pricesReducer";
import { loginReducer } from "../redux/reducers/loginReducer";
import { transactionReducer } from "../redux/reducers/transactionReducer";

const combinedReducer = combineReducers({
  login: loginReducer,
  price: pricesReducer,
  transaction: transactionReducer,
});
export const store = createStore(combinedReducer);

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
