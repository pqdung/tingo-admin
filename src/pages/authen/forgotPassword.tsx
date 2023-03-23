import * as React from 'react';
import { useStyles } from "../../layouts/styles/makeTheme";
import { Box, Button, Grid, TextField } from "@mui/material";
import TLoading from "../../components/common/TLoading";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import loginLogo from "../../assets/images/loginLogo.svg";
import { useTranslation } from "react-i18next";
import { Error } from "@mui/icons-material";

export default function ForgotPassword(this: any) {
  const classes = useStyles();
  const { t } = useTranslation(['account']);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
    }
  });

  const onHandleResetPassword = async (data: any) => {
  };

  return (
    <Box className={classes.MLoginWrapper}>
      <form onSubmit={handleSubmit((data: any) => onHandleResetPassword(data))}>
        <Grid container className={classes.MLoginContainer}>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <img src={loginLogo} width={320} alt={''}/>
            </Box>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }} pr={4}>
            <Grid container p={2}>
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
              <Grid item xs={12} mt={1}>
                <Button
                  className={classes.MButton}
                  variant={'contained'}
                  type={'submit'}
                  fullWidth
                >
                  {t('resetPassword')}
                </Button>
                <NavLink to={'/login'} style={{ textDecoration: 'none' }}>
                  <Button
                    className={classes.MButton}
                    variant={'outlined'}
                    type={'submit'}
                    fullWidth
                  >
                    {t('back')}
                  </Button>
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