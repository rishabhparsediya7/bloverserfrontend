import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogHome from "./Pages/BlogHome";
import Profile from "./Pages/Profile";
import Write from "./Pages/Write";
import EditProfile from "./Pages/EditProfile";
import EditBlog from "./Pages/EditBlog";
import SignUpAuth from "./Pages/SignUpAuth";
import UpdatePassword from "./Pages/UpdatePassword";
import SigninForm from "./Pages/SigninForm";
import BlogDetails from "./Pages/BlogDetails";
import ProtectedRoute from "./Pages/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <ProtectedRoute>
              <BlogHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <BlogHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/write"
          element={
            <ProtectedRoute>
              <Write />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blog/:blogid"
          element={
            <ProtectedRoute>
              <BlogDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-blog/:blogId"
          element={
            <ProtectedRoute>
              <EditBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-password"
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />
        <Route path="/signin" element={<SigninForm />} />
        <Route path="/signup" element={<SignUpAuth />} />
      </Routes>
    </Router>
  );
}

export default App;
