import "./App.css";
import Header from "./features/Header/Header";
import Profile from "./features/Profile/Profile";
import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./features/MainRoutes/MainRoutes";
import Navigation from "./features/Navigation/Navigation";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { useEffect } from "react";
import { authState, db } from "./firebase";
import { setProfileUserInReduxState, setUsersFromDataBase } from "./features/Profile/ProfileSlice";

function App() {
  const users = useAppSelector(state => state.profile.users)
  const profileUser = useAppSelector((state) => state.profile.profileUser);
  const dispatch = useAppDispatch();

  const getUsersFromDb = () => {
    let referenceToUsers = db.ref(db.dataBase, "users");

    db.onValue(referenceToUsers, (snapshot) => {
      const users = snapshot.val();
      dispatch(setUsersFromDataBase(users));
    });
  };
  const setProfileUser = () => {
    authState.onAuthStateChanged(authState.auth, (user) => {
      if (user) {
        dispatch(setProfileUserInReduxState(user.email))
      }
    });
  }

  useEffect(() => {
    getUsersFromDb();
  }, []);

  useEffect(() => {
    setProfileUser();
  },[users])

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        {profileUser?.email ? (
          <main className="App_Main">
            <section className="Profile_Bar">
              <Profile />
              <Navigation />
            </section>
            <section className="Route">
              <MainRoutes />
            </section>
          </main>
        ) : null}
      </div>
    </BrowserRouter>
  );
}

export default App;
