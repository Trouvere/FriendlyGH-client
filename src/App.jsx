import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import EditProfile from './pages/EditProfilePage';
import Footer from './pages/Footer';
import ChatsPage from './pages/ChatsPage';
import Header from './pages/Header';
import LoginPage from './pages/LoginPage';
import Preview from './pages/Preview';
import ProfilePage from './pages/ProfilePage';
import UsersPage from './pages/UsersPage';
import Menu from './pages/Menu';

function App() {
  const isAuth = useSelector((state) => state.authData.isAuth);
  return (
    <BrowserRouter>
      {isAuth && <Header />}
      {isAuth && <Menu />}
      <div className="contentWrapper">
        <Switch>
          <ProtectedRoute
            exact
            isAuth={isAuth}
            path="/profile/edit"
            component={EditProfile}
          />
          <Route exact path="/login" render={() => <LoginPage />} />
          <Route exact path="/" render={() => <Preview />} />
          <ProtectedRoute
            isAuth={isAuth}
            path="/profile/:userId"
            component={ProfilePage}
          />
          <ProtectedRoute
            exact
            isAuth={isAuth}
            path="/groups"
            component={ChatsPage}
          />
          <ProtectedRoute
            exact
            isAuth={isAuth}
            path="/users"
            component={UsersPage}
          />
        </Switch>
      </div>
      {isAuth && <Footer />}
    </BrowserRouter>
  );
}

export default App;
