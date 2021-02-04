import React, { useState, useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { config } from '../../config';
import { NotFound } from '../error/NotFound';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const Page = (props) => {
  const classes = useStyles();
  const [page, setPage] = useState(null);

    const getPage= async () => {
        let {data} = await axios.get(`${config.apiURL}/pages/${props.match.params.page}/slug`);

        if(data.code === 200){
          setPage(data.page);
        }
    }

    useEffect(() => {
        if(page) {
            getPage();
        }
            
    });

    return (
        page?
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        This page is for {page.name}
                    </Typography>
                </div>
            </Container>
        : <NotFound />
    );
}

export default Page;