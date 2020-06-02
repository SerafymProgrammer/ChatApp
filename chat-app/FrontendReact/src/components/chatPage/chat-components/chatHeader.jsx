import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useDispatch, useSelector, shallowEqual } from 'react-redux'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },

  titleRoom: {
    flexGrow: 1,
    marginLeft: 40,
    borderWidth:1,
    borderColor: '#000'
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const roomName = useSelector(state => state.chatReducer.roomName, shallowEqual);
  
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon onClick={props.showHideUsersList}/>
          </IconButton>
          <Typography variant="h6" className={classes.title} style={{color: props.colorNickName}}>
            {props.username}
          </Typography>
          {
            roomName!=='default' ?
          <Typography variant="h6" className={classes.titleRoom} style={{color: props.colorNickName}}>
            {roomName}
          </Typography>
          : null
          }
          <Button onClick={props.logout} color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}