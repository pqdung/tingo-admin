import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useStyles } from "../../layouts/styles/makeTheme";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export function UserPassword() {
  const classes = useStyles();
  const { t } = useTranslation('profile');
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const handleSaveAccount = (data: any) => {

  }

  const handleReset = () => {
    reset((formValues) => ({
      ...formValues,
      password: '',
      newPassword: '',
      confirmPassword: '',
    }))
  };

  return (
    <div>
      <form onSubmit={handleSubmit((data: any) => handleSaveAccount(data))}>
        <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', width: '40%' }} pr={4}>
          <Grid container p={2}>
            <Grid item xs={12}>
              <TextField {...register('password', { required: 'Enter password.' })}
                         className={classes.MTextField}
                         id={"password"}
                         name={"password"}
                         label={t('currentPassword')}
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
              <TextField {...register('newPassword', { required: 'Enter new password.' })}
                         className={classes.MTextField}
                         id={"newPassword"}
                         name={"newPassword"}
                         label={t('newPassword')}
                         type="password"
                         autoComplete="current-password"
                         size={'small'}
                         fullWidth
              />
              {errors.newPassword && <div className={classes.MTextValidate}>
                  <svg className={classes.MWarning} aria-hidden="true" fill="currentColor" focusable="false"
                       viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg">
                      <path
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                  </svg>
                {errors.newPassword?.message?.toString()}
              </div>}
            </Grid>
            <Grid item xs={12}>
              <TextField {...register('confirmPassword', { required: 'Enter confirm password.' })}
                         className={classes.MTextField}
                         id={"confirmPassword"}
                         name={"confirmPassword"}
                         label={t('confirmPassword')}
                         type="password"
                         autoComplete="current-password"
                         size={'small'}
                         fullWidth
              />
              {errors.confirmPassword && <div className={classes.MTextValidate}>
                  <svg className={classes.MWarning} aria-hidden="true" fill="currentColor" focusable="false"
                       viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg">
                      <path
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                  </svg>
                {errors.confirmPassword?.message?.toString()}
              </div>}
            </Grid>
            <Grid item xs={12}>
              <Button
                className={classes.MButton}
                variant={'contained'}
                type={'submit'}
              >
                {t('save')}
              </Button>
              <Button
                className={classes.MButton}
                variant={'outlined'}
                type={'button'}
                onClick={handleReset}
              >
                {t('reset')}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}