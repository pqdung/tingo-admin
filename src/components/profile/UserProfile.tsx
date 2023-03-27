import { Button, Fab, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { objectNullOrEmpty } from "../../utils/utils";
import { useStyles } from "../../layouts/styles/makeTheme";
import { useForm } from "react-hook-form";
import { AuthenticationService } from "../../services/access/authenticationService";
import { AddPhotoAlternate, Error } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

export function UserProfile() {
  const classes = useStyles();
  const { t } = useTranslation(['profile', 'account']);
  const [currentUser] = useState(AuthenticationService.getCurrentUser());
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      fullName: objectNullOrEmpty(currentUser) ? '' : currentUser.fullName,
      email: objectNullOrEmpty(currentUser) ? '' : currentUser.email,
      phone: objectNullOrEmpty(currentUser) ? '' : currentUser.phone,
    }
  });
  const [selectedFile, setSelectedFile] = useState();

  const handleSaveAccount = (data: any) => {

  }

  const handleUploadClick = (event: any) => {
    const file = event.target.files[0];
    const reader: any = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function (e: any) {
      // @ts-ignore
      setSelectedFile([reader.result]);
    };

    setSelectedFile(file);
  };

  const handleReset = () => {
    reset((formValues) => ({
      ...formValues,
      fullName: '',
      email: '',
      phone: '',
    }))
  };

  return (
    <div>
      <form onSubmit={handleSubmit((data: any) => handleSaveAccount(data))}>
        <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', width: '40%' }} pr={4}>
          <Grid container p={2}>
            <Grid item xs={12} mb={5}>
              <Grid container>
                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={handleUploadClick}
                    hidden
                  />
                  <label htmlFor="contained-button-file">
                    <Fab component="span" sx={{ backgroundColor: '#1976d2' }}>
                      <AddPhotoAlternate/>
                    </Fab>
                  </label>
                </Grid>
                <Grid item xs={6}>
                  <img
                    width="100%"
                    src={selectedFile}
                    alt={''}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField {...register('fullName', {
                required: t('enterName', { ns: 'account' }).toString()
              })}
                         className={classes.MTextField}
                         id={"fullName"}
                         name={"fullName"}
                         label={t('name')}
                         size={'small'}
                         fullWidth
              />
              {
                errors.fullName && <div className={classes.MTextValidate}>
                      <Error sx={{ fontSize: 'large' }}/>
                  {errors.fullName?.message?.toString()}
                  </div>
              }
            </Grid>
            <Grid item xs={12}>
              <TextField {...register('email', {
                required: t('enterEmail', { ns: 'account' }).toString(),
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  message: t('message.invalidEmail', { ns: 'account' })
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
                  {errors.email?.message?.toString()}
                  </div>
              }
            </Grid>
            <Grid item xs={12}>
              <TextField {...register('phone', {
                required: t('enterPhone', { ns: 'account' }).toString()
              })}
                         className={classes.MTextField}
                         id={"phone"}
                         name={"phone"}
                         label={t('phone')}
                         size={'small'}
                         fullWidth
              />
              {
                errors.phone && <div className={classes.MTextValidate}>
                      <Error sx={{ fontSize: 'large' }}/>
                  {errors.phone?.message?.toString()}
                  </div>
              }
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