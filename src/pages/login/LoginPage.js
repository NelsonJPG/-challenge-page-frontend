import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LoginForm from '../../components/LoginForm/LoginForm';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const history = useHistory();

  if(localStorage.getItem('user')) {
    history.push('/admin');
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Challenge Page Admin
        </Typography>
        <LoginForm />
      </div>
    </Container>
  );
}

export default LoginPage;