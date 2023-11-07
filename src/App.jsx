import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./components/Login";
import Error from "./components/Error";
import Rootlayout from "./components/Rootlayout";
import AddProduct from "./components/AddProduct";
import AllProduct from "./components/AllProduct";
import AllVariant from "./components/AllVariant";
import Registration from "./components/Registration";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/registration" element={<Registration />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Rootlayout />}>
          <Route path="/addproduct" element={<AddProduct />}></Route>
          <Route path="/allproduct" element={<AllProduct />}></Route>
          <Route path="/allvariant" element={<AllVariant />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
