import React, { useEffect, useCallback } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import { useInput } from "../../hooks/useInput";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  inputMsg: {
    width: "50%",

    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  formMsg: {
    display: "flex",
  },
}));

const InputMessageForm = (props) => {
  const classes = useStyles();
  const { value: message, bind: bindMessage, reset: resetMessage } = useInput("");

  useEffect(() => {
    ValidatorForm.addValidationRule("maxSymbols", (value) => {
      return value.length < 200;
    });

    return () => {
      ValidatorForm.removeValidationRule("maxSymbols");
    };
  }, [ValidatorForm]);

  const handleSubmit = useCallback(() => {
    const newMsg = message;
    resetMessage();
    props.handleSubmit(newMsg);
  });

  return (
    <ValidatorForm onSubmit={handleSubmit} className={classes.form}>
      <TextValidator
        fullWidth
        label="Message"
        {...bindMessage}
        name="message"
        validators={["required", "maxSymbols"]}
        errorMessages={["this field is required", "maximum 200 symbols"]}
        margin="normal"
        className={classes.inputMsg}
      />
      <IconButton aria-label="send" type="submit">
        <SendIcon />
      </IconButton>
    </ValidatorForm>
  );
};

export default InputMessageForm;
