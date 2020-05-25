import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginTop: 5,
    justifyContent: "flex-start",
  },
  myMsg: {
    display: "flex",
    marginTop: 5,
    justifyContent: "flex-end",
    
  },
  rootPaper: {
    padding: theme.spacing(1),
    maxWidth: 200,
    borderRadius: 20,
    backgroundColor: '#eaeaea'
  },
  myMsgPaper: {
    padding: theme.spacing(1),
    maxWidth: 200,
    borderRadius: 20,
    backgroundColor: '#c1e2ce'
  },
  msgText: {
    margin: "auto",
    display: "block",
    maxHeight: "100%",
  },
}));

export default function Message(props) {
  const { timeMessage, authorMessage, textMessage, username, colorNickName} = props;
  const classes = useStyles(
    username === authorMessage ? "flex-end" : "flex-start"
  );

  return (
    <div className={username === authorMessage ? classes.myMsg : classes.root}>
      <Paper className={username === authorMessage ? classes.myMsgPaper : classes.rootPaper}>
        <Grid item xs container direction="column" className={username === authorMessage ? classes.myMsgPaper : classes.rootPaper}> 
          <Grid item xs>
            <Typography  variant="subtitle2" style={{color: colorNickName}} >
              {authorMessage}
            </Typography>
          </Grid>
          <Grid item xs >
            <Typography variant="body1" style={{wordWrap: 'break-word'}}>
              {textMessage}
            </Typography>
          </Grid>
          <Grid item xs >
            <Typography variant="body2" color="textSecondary">
              {timeMessage}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
