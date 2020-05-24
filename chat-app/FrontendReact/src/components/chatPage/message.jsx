import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

import { styled } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

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
  paper: {
    padding: theme.spacing(1),
    maxWidth: 200,
    borderRadius: 20,
  },
  msgText: {
    margin: "auto",
    display: "block",
    //maxWidth: "100%",
    maxHeight: "100%",
  },
}));

export default function Message(props) {
  const { timeMessage, authorMessage, textMessage, username, colorNickName } = props;
  const classes = useStyles(
    username === authorMessage ? "flex-end" : "flex-start"
  );

  return (
    // <Container >
    <div className={username === authorMessage ? classes.myMsg : classes.root}>
      <Paper className={classes.paper}>
        <Grid item xs container direction="column">
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
    // </Container>
  );
}
