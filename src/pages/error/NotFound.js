import { Typography } from '@material-ui/core'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

export const NotFound = () => {
    return (
        <Fragment>
            <Typography variant="h1">Page not Found</Typography>
            <Link to="/">Volver</Link>
        </Fragment>
    )
}
