import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import store from "./app/store";

function App() {
  return (
    <BrowserRouter store={store}>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
