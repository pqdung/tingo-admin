import * as React from 'react';
import { useStyles } from "../../layouts/styles/makeTheme";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { onChange } from "../../utils/utils";
import { loginForm } from "../../models/user-interface";
import { loginKeyCloakAsync } from "../../store/slices/authSlice";
import { useAppDispatch } from "../../store/store";

export function Login(this: any) {
  const classes = useStyles();
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const form: loginForm = {
        userId: values.email,
        password: values.password,
      };
      await dispatch(loginKeyCloakAsync(form));
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <Box className={classes.MLoginWrapper}>
      <Grid container className={classes.MLoginContainer}>
        <Grid item xs={6} className={classes.MLoginLeft}>

        </Grid>
        <Grid item xs={6} className={classes.MLoginRight}>
          <Grid container p={2}>
            <Grid item xs={12}>
              <TextField
                className={classes.MTextField}
                required
                id={"email"}
                name={"email"}
                label="Email"
                placeholder="Please input email"
                onChange={onChange.bind(this, setValues, values)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.MTextField}
                required
                id={"password"}
                name={"password"}
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={onChange.bind(this, setValues, values)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                className={classes.MButton}
                variant={'contained'}
                onClick={handleLogin}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}