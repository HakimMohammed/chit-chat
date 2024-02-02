import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "../Components/Authentication/Signin";
import Signup from "../Components/Authentication/Signup";
import PrivateRoute from "./PrivateRoute";
import Acceuil from "../Components/Home/Acceuil";
import Slideover from "../Components/Home/Slideover";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <PrivateRoute>
              <Acceuil />
            </PrivateRoute>
          }
        />{" "}
        <Route exact path="/sign-in" element={<Signin />} />
        <Route exact path="/sign-up" element={<Signup />} />
        <Route exact path="/test" element={<Slideover />} />
      </Routes>
    </BrowserRouter>
  );
}

// export const router = createBrowserRouter([
//     {path:"/", element:<FirestoreTest />},
//     {path:"/sign-in", element:<Signin />},
//     {path:"/sign-up", element:<Signup />},
//     {path:"/home", element:<Home />},
// ]);
