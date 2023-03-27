import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useStyles } from "../../layouts/styles/makeTheme";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Error } from "@mui/icons-material";
import { AuthenticationService } from "../../services/access/AuthenticationService";
import { objectNullOrEmpty } from "../../utils/Utils";

export function UserPassword() {
  const classes = useStyles();
  const { t } = useTranslation(['profile', 'account']);
  const [currentUser] = useState(AuthenticationService.getCurrentUser());
  const { register, getValues, handleSubmit, reset, formState: { errors } } = useForm();

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
              <TextField {...register('password', {
                required: t('enterPassword', { ns: 'account' }).toString(),
                validate: () => {
                  const { password } = getValues();
                  if (!objectNullOrEmpty(currentUser) && password !== currentUser.password) {
                    return t('message.invalidOldPassword', { ns: 'account' }).toString();
                  }
                }
              })}
                         className={classes.MTextField}
                         id={"password"}
                         name={"password"}
                         label={t('currentPassword')}
                         type="password"
                         autoComplete="current-password"
                         size={'small'}
                         fullWidth
              />
              {
                errors.password && <div className={classes.MTextValidate}>
                      <Error sx={{ fontSize: 'large' }}/>
                  {errors.password?.message?.toString()}
                  </div>
              }
            </Grid>
            <Grid item xs={12}>
              <TextField {...register('newPassword', {
                required: t('enterPassword', { ns: 'account' }).toString(),
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: t('message.invalidPassword', { ns: 'account' })
                }
              })}
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
                  <Error sx={{ fontSize: 'large' }}/>
                {errors.newPassword?.message?.toString()}
              </div>}
            </Grid>
            <Grid item xs={12}>
              <TextField {...register('confirmPassword', {
                required: t('enterPassword', { ns: 'account' }).toString(),
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: t('message.invalidPassword', { ns: 'account' })
                },
                validate: (val: string) => {
                  const { password } = getValues();
                  if (password !== val) {
                    return t('message.notMatchConfirmPassword', { ns: 'account' }).toString()
                  }
                }
              })}
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
                  <Error sx={{ fontSize: 'large' }}/>
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