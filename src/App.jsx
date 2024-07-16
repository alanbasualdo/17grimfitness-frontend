import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { AppRouter } from "./router/AppRouter";
import "remixicon/fonts/remixicon.css";
import "./main.css";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
