import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import { ToastBar, Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
      <Toaster
        containerStyle={{
          position: "fixed",
          top: "83%",
        }}
      >
        {(t) => (
          <ToastBar
            toast={t}
            style={{
              transition: "0.1s",
              ...t.style,
              animation: t.visible
                ? "custom-enter 0.5s ease"
                : "custom-exit 0.5s ease",
            }}
          />
        )}
      </Toaster>
    </BrowserRouter>
  );
}

export default App;
