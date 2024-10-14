import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import UserList from "./pages/user-list/UserList";
import UserDetails from "./pages/user-details/UserDetails";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/users" element={<UserList />} />
    <Route path="/users/:id" element={<UserDetails />} />
  </Routes>
);
