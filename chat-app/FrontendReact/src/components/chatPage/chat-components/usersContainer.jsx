import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    position: "relative",
    height: 'avalaible',
    maxHeight: 'inherit',
    borderColor: "#000",
    borderWidth: 2,
    backgroundColor: "#eabf7d8c",
    top: 0,
    left: 0,
    [theme.breakpoints.down('xs')]: {
      position: 'absolute', 
      backgroundColor: "#8cd2b5", 
      height: 300,
      overflowY: 'scroll'
    }
  },
  ul: {
    backgroundColor: "#eabf7d8c",
    padding: 0,
  },

}));

export default function UsersList(props) {
  const { isAdmin, users, userName, setMuteStatus, setBan, showUsersContainer} = props;
  const handleMute = (user) => {
    setMuteStatus(user)
  }

  const handleBan = (id) => {
    setBan(id)
  }
  
  const classes = useStyles();
  
  const usersCategories = {
    Online: users.filter((user)=>user.onlineStatus),
    Offline: users.filter((user)=>!user.onlineStatus),
  }

  let arr = isAdmin ? ["Online", "Offline"] : ["Online"];

  return (
    <List className={classes.root} subheader={<li />} 
      style={showUsersContainer ? 
      {display: 'block'}:{display: 'none'}}>
      {arr.map((status, index) => (
        <li key={`section-${index}`} className={classes.listSection}>
          <ul className={classes.ul}>
            <ListSubheader>{`${status}`}</ListSubheader>
            {usersCategories[status].map((user) => (
              <ListItem key={`${user.nickName}`}>
                <ListItemText primary={`${user.nickName}`} style={{color: user.nickNameColor}}/>
                {isAdmin && (user.nickName!==userName) ? (
                  <ButtonGroup
                    size="small"
                    aria-label="small outlined button group"
                  >
                    <Button onClick={()=>handleMute(user)}> {user.isMuted ? 'unmute' : 'mute'}</Button>
                    <Button onClick={()=>handleBan(user.id)}>{user.isBaned ? 'unban' : 'ban'}</Button>
                  </ButtonGroup>
                ) : null}
              </ListItem>
            ))}
          </ul>
        </li>
      ))}
    </List>
  );
}
