import * as React from 'react';
import { useStyles } from "../../layouts/styles/makeTheme";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { objectNullOrEmpty } from "../../utils/utils";
import { AuthenticationService } from "../../services/access/AuthenticationService";
import TLoading from "./TLoading";
import { useForm } from "react-hook-form";
import loginLogo from '../../assets/images/loginLogo.svg';
import { NavLink } from "react-router-dom";

export function Login() {
  const classes = useStyles();
  const [errorLogin, setErrorLogin] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: '',
      password: ''
    }
  });

  const onHandleLogin = async (data: any) => {
    setLoading(true);
    try {
      // await dispatch(loginKeyCloakAsync(form));
      await AuthenticationService.login(data.username, data.password);
      if (AuthenticationService.isLogin()) {
        setErrorLogin({});
        window.location.href = '/';
      } else {
        errorLogin.isLogin = false;
        setErrorLogin(errorLogin);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <Box className={classes.MLoginWrapper}>
      <form onSubmit={handleSubmit((data: any) => onHandleLogin(data))}>
        <Grid container className={classes.MLoginContainer}>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <img src={loginLogo} width={320} alt={''}/>
            </Box>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }} pr={4}>
            <Grid container p={2}>
              {(!objectNullOrEmpty(errorLogin) && !errorLogin.isLogin) && <div className={classes.MTextValidate}>
                {'Your username and/or password are incorrect.'}
              </div>}
              <Grid item xs={12}>
                <TextField {...register('username', { required: 'Enter username.' })}
                           className={classes.MTextField}
                           id={"username"}
                           name={"username"}
                           label="User"
                           placeholder="Please input User"
                           size={'small'}
                           fullWidth
                />
                {errors.username && <div className={classes.MTextValidate}>
                    <svg className={classes.MWarning} aria-hidden="true" fill="currentColor" focusable="false"
                         viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg">
                        <path
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                    </svg>
                  {errors.username?.message?.toString()}
                </div>}
              </Grid>
              <Grid item xs={12}>
                <TextField {...register('password', { required: 'Enter password.' })}
                           className={classes.MTextField}
                           id={"password"}
                           name={"password"}
                           label="Password"
                           type="password"
                           autoComplete="current-password"
                           size={'small'}
                           fullWidth
                />
                {errors.password && <div className={classes.MTextValidate}>
                    <svg className={classes.MWarning} aria-hidden="true" fill="currentColor" focusable="false"
                         viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg">
                        <path
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                    </svg>
                  {errors.password?.message?.toString()}
                </div>}
              </Grid>
              <Grid item xs={12}>
                <Button
                  className={classes.MButton}
                  variant={'contained'}
                  type={'submit'}
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Typography fontSize={'small'} ml={1} mr={1}>{`Don't have an account?`} </Typography>
                <NavLink to={'/signup'}>
                  <Typography fontSize={'small'}>
                    {'Register'}
                  </Typography>
                </NavLink>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
      <TLoading open={loading}/>
    </Box>
  );
}