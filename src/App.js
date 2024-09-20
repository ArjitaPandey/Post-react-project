import { useState, useEffect } from "react";
import "./App.css";
import conf from "./conf/conf";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import authSlice from "./store/authSlice";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components/index";
import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
      if (userData) {
        dispatch(login({ userData }));
      }
      else {
        dispatch(logout())
      }
    }).finally(() => { setLoading(false) })
  }, [])

  return !loading ? (<>
    <div className="flex flex-wrap content-between bg-gray-400">
      <div className="w-full block bg-white">
        <Header />
        <main>
          <Outlet />
        </main>
        {/* <Footer /> */}

      </div>
    </div>
  </>) : (null);
}

export default App;