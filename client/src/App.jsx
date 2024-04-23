import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

function App() {
  const { authUser } = useAuthContext();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <SignUp />}
        />
      </Routes>
      {/* <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools> */}
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
