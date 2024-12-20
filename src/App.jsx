import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./page/Home/Home";
import Login from "./page/Login/Login";
import DetailMovie from "./page/DetailMovie/DetailMovie";
import Layout from "./template/Layout";
import Register from "./page/Register/Register";
import Purchase from "./page/Purchase/Purchase";
import Account from "./page/Account/Account";
import Auth from "./page/Admin/Auth";
import PrivateRoute from "./template/PrivateRoute";
import PageNotFound from "./page/PageNotFound/PageNotFound";
import AdminLayout from "./template/AdminLayout";
import UserPage from "./page/UserPage/UserPage";
import MoviePage from "./page/UserPage/MoviePage";
import Spinner from "./component/Spinner";
import AdminAccount from "./page/Account/AdminAccount";

function App() {
  return (
    <div>
      <Spinner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminLayout />
              </PrivateRoute>
            }
          >
            <Route path="/admin" element={<Navigate to="/admin/user" />} />
            <Route path="/admin/user" element={<UserPage />} />
            <Route path="/admin/movie" element={<MoviePage />} />
            <Route path="/admin/account" element={<AdminAccount />} />
          </Route>

          {/* Authentication Routes */}
          <Route path="/admin/auth" element={<Auth />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />

          {/* Detail and Purchase Routes */}
          <Route
            path="/detail/:id"
            element={
              <Layout>
                <DetailMovie />
              </Layout>
            }
          />
          <Route
            path="/purchase/:id"
            element={
              <Layout>
                <Purchase />
              </Layout>
            }
          />

          {/* 404 Page */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
