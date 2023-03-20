import * as React from 'react';
import { useStyles } from "../../layouts/styles/makeTheme";
import { Box, Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { onChange } from "../../utils/utils";
import { AuthenticationService } from "../../services/access/AuthenticationService";
import TLoading from "./TLoading";

export function Login(this: any) {
  const classes = useStyles();
  const [values, setValues] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      // await dispatch(loginKeyCloakAsync(form));
      await AuthenticationService.login(values.username, values.password);
      if (AuthenticationService.isLogin()) {
        window.location.href = '/';
      }
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
                id={"username"}
                name={"username"}
                label="User Name"
                placeholder="Please input User Name"
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
      <TLoading open={loading}/>
    </Box>
  );
}