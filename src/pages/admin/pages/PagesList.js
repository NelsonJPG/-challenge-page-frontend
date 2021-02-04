import React, {useEffect, useState} from 'react';
import swal from 'sweetalert'
import axios from 'axios';
import MaterialTable from 'material-table'
import {Grid, Paper, Button} from '@material-ui/core';
import { config } from '../../../config';
import { useHistory } from "react-router-dom";

const PagesList = () => {
    const history = useHistory();
    const [pages, setPages] = useState([]);

    const getPages = async () => {
        const user =JSON.parse(localStorage.getItem('user'));

        let {data} = await axios.get(`${config.apiURL}/pages`, {headers: {authorization: user.token}});
        
        if(data.code === 403){
          
            const response = await axios.get(`${config.apiURL}/auth/logout`, {
                headers: {authorization: JSON.parse(localStorage.getItem('user')).token}
            })
    
            if(response.data.code === 401 || response.data.code === 200) {
                localStorage.removeItem('user');
                swal("Success Operation", 'Logout successfully', 'success');
                return history.push('/');
            }
        }

        if(data.pages && data.pages.length){
            setPages(data.pages);
        }
    }

    useEffect(() => {
        if(!pages.length){
            getPages();
        } 
            
    });


    return(
        <Grid container spacing={3} justify="center">
            <Grid item md={6} >
                <Button style={{marginLeft: "auto", marginBottom:"10px", marginTop: "10px"}} variant="contained" color="primary" onClick={() => history.push('/admin/create')}>Create Page</Button>
                <Paper elevation={1}>
                        
                    <MaterialTable
                        columns={[
                            { title: 'name', field: 'name' },
                            { title: 'slug', field: 'slug' },
                        ]}
                        data={pages}
                        title="Pages List"
                    />
                </Paper>
            </Grid>
        </Grid>

    )
    
}

export default PagesList;