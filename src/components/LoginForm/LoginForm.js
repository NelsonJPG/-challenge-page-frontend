import React, { useState }from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import {Button, TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { config } from '../../config';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));

const LoginForm = () => {
    const history = useHistory();
    const classes = useStyles();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        setLoading(true);

        let {data} = await axios.post(`${config.apiURL}/auth/login`, {
            "username": username,
            "password": password
        });

        if(data.code !== 200) {
            swal("Operation Failed", data.message, "error");  
            setLoading(false);
            return;   
        }

        localStorage.setItem('user', JSON.stringify(data.user));
        return history.push("/admin");
    }

    const handleChangeUsername = (event) => {
        event.persist();
        setUsername(event.target.value);
    }

    const handleChangePassword = (event) => {
        event.persist();
        setPassword(event.target.value);
    }

    return (
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={handleChangeUsername}
                autoFocus
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                onChange={handleChangePassword}
                id="password"
                autoComplete="current-password"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={loading || !username || !password }
            >
                {loading? "Cargango...": "Sign In"}
            </Button>
        </form>
    )
}

export default LoginForm;