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

const PagesForm = () => {
    const history = useHistory();
    const classes = useStyles();
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const user =JSON.parse(localStorage.getItem('user'));

        setLoading(true);

        let {data} = await axios.post(`${config.apiURL}/pages`, {
            name: name,
            active: true
        }, {headers: {authorization: user.token}});

        if(data.code === 403){
            const response = await axios.get(`${config.apiURL}/auth/logout`, {
                headers: {authorization: JSON.parse(localStorage.getItem('user')).token}
            })
            
            if(response.data.code === 401 || response.data.code === 200) {
                localStorage.removeItem('user');
                swal('Logout successfully', 'success');
                return history.push('/');
            }
        }
        
        if(data.code !== 201) {
            swal("Operation Failed", data.message, "error");  
            setLoading(false);
            return;   
        }

        return history.push("/admin");
    }

    const handleChangeName = (event) => {
        event.persist();
        setName(event.target.value);
    }

    return (
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="name"
                name="name"
                autoComplete="name"
                onChange={handleChangeName}
                autoFocus
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={loading || !name}
            >
                {loading? "Cargando...": "Save"}
            </Button>
        </form>
    )
}

export default PagesForm;