import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Modal from 'react-modal';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Register from './components/Register';
import Login from './components/Login';
import './App.css';

Modal.setAppElement('#root'); // Set the root element for the modal

const useStyles = makeStyles((theme) => ({
  navbar: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
  },
  navLink: {
    margin: theme.spacing(0, 2),
    color: '#333',
    textDecoration: 'none',
  },
  modalContent: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
  },
}));

const App = () => {
  const classes = useStyles();
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const openRegisterModal = () => {
    setRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setRegisterModalOpen(false);
  };

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  return (
    <Router>
      <div className={classes.navbar}>
        <Link to="/" className={classes.navLink} onClick={openRegisterModal}>
          Register
        </Link>
        <Link to="/login" className={classes.navLink} onClick={openLoginModal}>
          Login
        </Link>
      </div>
      <Routes>
        <Route exact path="/" component={Register} />
        <Route path="/login" component={Login} />
      </Routes>

      {/* Register Modal */}
      <Modal
        isOpen={isRegisterModalOpen}
        onRequestClose={closeRegisterModal}
        contentLabel="Register Modal"
        className={classes.modalContent}
      >
        <Register />
      </Modal>

      {/* Login Modal */}
      <Modal
        isOpen={isLoginModalOpen}
        onRequestClose={closeLoginModal}
        contentLabel="Login Modal"
        className={classes.modalContent}
      >
        <Login />
      </Modal>
    </Router>
  );
};

export default App;
