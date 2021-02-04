import React from 'react';
import {Grid, Paper, Button} from '@material-ui/core';
import { useHistory } from "react-router-dom";
import PagesForm from '../../../components/LoginForm/PagesForm';

const PagesCreate = () => {
    const history = useHistory();
    return(
        <Grid container spacing={3} justify="center">
            <Grid item md={6} >
                <Button style={{marginLeft: "auto", marginBottom:"10px", marginTop: "10px"}} variant="contained" color="primary" onClick={() => history.push('/admin')}>List Page</Button>
                <Paper elevation={1} style={{padding: "20px", marginTop: "20px"}}>
                    <PagesForm />
                </Paper>
            </Grid>
        </Grid>
    )
}

export default PagesCreate;