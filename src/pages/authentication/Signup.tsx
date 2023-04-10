import * as React from 'react';
import { useStyles } from "../../layouts/styles/makeTheme";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import registerLogo from '../../assets/images/registerLogo.svg';
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Error } from "@mui/icons-material";

export default function Signup(this: any) {
  const classes = useStyles();
  const { t } = useTranslation(['account']);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      username: '',
      password: ''
    }
  });

  const onHandleRegister = async (data: any) => {
  };

  return (
    <Box className={classes.MLoginWrapper}>
      <form onSubmit={handleSubmit((data: any) => onHandleRegister(data))}>
        <Grid container className={classes.MLoginContainer}>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <img src={registerLogo} width={320} alt={''}/>
            </Box>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }} pr={4}>
            <Grid container p={2}>
              <Grid item xs={12}>
                <TextField {...register('username', { required: t('enterUser').toString() })}
                           className={classes.MTextField}
                           id={"username"}
                           name={"username"}
                           label={t('user')}
                           size={'small'}
                           fullWidth
                />
                {
                  errors.username && <div className={classes.MTextValidate}>
                        <Error sx={{ fontSize: 'large' }}/>
                    {errors.username?.message}
                    </div>
                }
              </Grid>
              <Grid item xs={12}>
                <TextField {...register('email', {
                  required: t('enterEmail').toString(),
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                    message: t('message.invalidEmail')
                  }
                })}
                           className={classes.MTextField}
                           id={"email"}
                           name={"email"}
                           label={t('email')}
                           size={'small'}
                           fullWidth
                />
                {
                  errors.email && <div className={classes.MTextValidate}>
                        <Error sx={{ fontSize: 'large' }}/>
                    {errors.email?.message}
                    </div>
                }
              </Grid>
              <Grid item xs={12}>
                <TextField {...register('password', {
                  required: t('enterPassword').toString(),
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: t('message.invalidPassword')
                  }
                })}
                           className={classes.MTextField}
                           id={"password"}
                           name={"password"}
                           label={t('password')}
                           type="password"
                           autoComplete="current-password"
                           size={'small'}
                           fullWidth
                />
                {
                  errors.password && <div className={classes.MTextValidate}>
                        <Error sx={{ fontSize: 'large' }}/>
                    {errors.password?.message}
                    </div>
                }
              </Grid>
              <Grid item xs={12}>
                <Button
                  className={classes.MButton}
                  variant={'contained'}
                  type={'submit'}
                >
                  {t('register')}
                </Button>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Typography fontSize={'small'} ml={1} mr={1}>{t('hadAccountLabel')} </Typography>
                <NavLink to={'/login'} style={{ textDecoration: 'none' }}>
                  <Typography fontSize={'small'}>
                    {t('login')}
                  </Typography>
                </NavLink>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}