import React from 'react'
import {makeStyles} from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
const useStyles=makeStyles({
    page:{
        width:'100%'
    }
});

export default function Layout({children}) {
    const classes=useStyles();
    return (
        <div>
            <div className={classes.page} alignItems="center">
            {children}
            </div>
        </div>
    )
}
