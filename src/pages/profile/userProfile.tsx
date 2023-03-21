import { Button, Fab, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { objectNullOrEmpty } from "../../utils/utils";
import { useStyles } from "../../layouts/styles/makeTheme";
import { useForm } from "react-hook-form";
import { AuthenticationService } from "../../services/access/AuthenticationService";
import { AddPhotoAlternate } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

export function UserProfile() {
  const classes = useStyles();
  const { t } = useTranslation('profile');
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
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField {...register('fullName', { required: 'Enter name.' })}
                         className={classes.MTextField}
                         id={"fullName"}
                         name={"fullName"}
                         label={t('name')}
                         placeholder="Please input name"
                         size={'small'}
                         fullWidth
              />
              {errors.fullName && <div className={classes.MTextValidate}>
                  <svg className={classes.MWarning} aria-hidden="true" fill="currentColor" focusable="false"
                       viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg">
                      <path
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                  </svg>
                {errors.fullName?.message?.toString()}
              </div>}
            </Grid>
            <Grid item xs={12}>
              <TextField {...register('email', { required: 'Enter email.' })}
                         className={classes.MTextField}
                         id={"email"}
                         name={"email"}
                         label={t('email')}
                         size={'small'}
                         fullWidth
              />
              {errors.email && <div className={classes.MTextValidate}>
                  <svg className={classes.MWarning} aria-hidden="true" fill="currentColor" focusable="false"
                       viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg">
                      <path
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                  </svg>
                {errors.email?.message?.toString()}
              </div>}
            </Grid>
            <Grid item xs={12}>
              <TextField {...register('phone', { required: 'Enter phone.' })}
                         className={classes.MTextField}
                         id={"phone"}
                         name={"phone"}
                         label={t('phone')}
                         size={'small'}
                         fullWidth
              />
              {errors.phone && <div className={classes.MTextValidate}>
                  <svg className={classes.MWarning} aria-hidden="true" fill="currentColor" focusable="false"
                       viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg">
                      <path
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                  </svg>
                {errors.phone?.message?.toString()}
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