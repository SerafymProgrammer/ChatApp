import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {AccountCircle, VpnKey} from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const TextInput = function(props){
  const {id, label, type} = props;

  return (
        <TextField id={id} label={label} type={type}/>
  );
}

export default TextInput;

