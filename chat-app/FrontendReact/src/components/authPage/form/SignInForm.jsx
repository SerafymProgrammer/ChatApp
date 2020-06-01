import React, { useEffect, useCallback } from "react";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import CircularProgress from "@material-ui/core/CircularProgress";
import {useInput} from '../../hooks/useInput'

const SignInForm = ({ isFetching, handleSubmit }) => {

  const { value:username, bind:bindUserName, reset:resetUserName } = useInput('');
  const { value:password, bind:bindPassword, reset:resetPassword } = useInput('');

  useEffect(() => {
    ValidatorForm.addValidationRule("moreThanThreeChar", (value) => {
      return value.length > 3;
    });
    ValidatorForm.addValidationRule("notAllowedSpecialSymbols", (value) => {
      return !(/[^A-zА-яЁё0-9]/.test(value));
    });

    return () => {
      ValidatorForm.removeValidationRule("moreThanThreeChar");
      ValidatorForm.removeValidationRule("moreThanThreeChar");
    }
  }, [ValidatorForm]);


  const handleSubmitCallback = useCallback((evt) => {
    evt.preventDefault();
    handleSubmit({username, password});
  }, [username, password, handleSubmit]);

  return (
    <ValidatorForm  onSubmit={handleSubmitCallback}>
      <TextValidator
        fullWidth
        label="Username"
        name="username"
        {...bindUserName}
        validators={[
          "required",
          "moreThanThreeChar",
          "notAllowedSpecialSymbols",
        ]}
        errorMessages={[
          "this field is required",
          "3 characters minimum",
          "Not allowed special symbols",
        ]}
        margin="normal"
      />
      <TextValidator
        fullWidth
        label="Password"
        type="password"
        {...bindPassword}
        name="password"
        validators={["required"]}
        errorMessages={["this field is required"]}
        margin="normal"
      />
      <Button
        variant="contained"
        fullWidth
        color="primary"
        type="submit"
        disabled={isFetching}
        margin="normal"
      >
        {isFetching && <CircularProgress size={20} />} Sign In
      </Button>
    </ValidatorForm>
  );
}




export default SignInForm;
