import { Alert, Button, Grid, Snackbar, TextField } from "@mui/material";
import React, { useState } from "react";
import { objectNullOrEmpty } from "../../utils/utils";
import { useStyles } from "../../layouts/styles/makeTheme";
import { useForm } from "react-hook-form";
import { AuthenticationService } from "../../services/access/AuthenticationService";
import { User } from "../../models/user-interface";
import { useTranslation } from "react-i18next";

export function UserAccount() {
  const classes = useStyles();
  const { t } = useTranslation('profile');
  const [openPopupModal, setOpenPopupModal] = React.useState<boolean>(false);
  const [currentUser] = useState(AuthenticationService.getCurrentUser());
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      fullName: objectNullOrEmpty(currentUser) ? '' : currentUser.fullName,
      email: objectNullOrEmpty(currentUser) ? '' : currentUser.email,
      role: objectNullOrEmpty(currentUser) ? '' : currentUser.role,
    }
  });

  const handleSaveAccount = (data: any) => {
    let currentUser: User = AuthenticationService.getCurrentUser();
    if (objectNullOrEmpty(currentUser)) {
      return;
    }
    currentUser.fullName = data.fullName;
    currentUser.email = data.email;
    currentUser.role = data.role;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    setOpenPopupModal(true);
  }

  const handleClosePopup = () => {
    setOpenPopupModal(false);
  };

  const handleReset = () => {
    reset((formValues) => ({
      ...formValues,
      fullName: '',
      email: '',
      role: '',
    }))
  };

  return (
    <div>
      <form onSubmit={handleSubmit((data: any) => handleSaveAccount(data))}>
        <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', width: '40%' }} pr={4}>
          <Grid container p={2}>
            <Grid item xs={12}>
              <TextField {...register('fullName', { required: 'Enter name.' })}
                         className={classes.MTextField}
                         id={"fullName"}
                         name={"fullName"}
                         label={t('name')}
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
              <TextField {...register('role', { required: 'Enter role.' })}
                         className={classes.MTextField}
                         id={"role"}
                         name={"role"}
                         label={t('role')}
                         size={'small'}
                         fullWidth
              />
              {errors.role && <div className={classes.MTextValidate}>
                  <svg className={classes.MWarning} aria-hidden="true" fill="currentColor" focusable="false"
                       viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg">
                      <path
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                  </svg>
                {errors.role?.message?.toString()}
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
      <Snackbar open={openPopupModal} autoHideDuration={2000} onClose={handleClosePopup}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={handleClosePopup} severity="success" sx={{ width: '100%' }}>
          {t('saveSuccess')}
        </Alert>
      </Snackbar>
    </div>
  );
}