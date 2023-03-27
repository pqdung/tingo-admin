import * as React from 'react';
import { useStyles } from "../../layouts/styles/makeTheme";
import { Box, Button, FormControl, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { objectNullOrEmpty } from "../../utils/Utils";
import { AuthenticationService } from "../../services/access/AuthenticationService";
import TLoading from "../../components/common/TLoading";
import { useForm } from "react-hook-form";
import loginLogo from '../../assets/images/loginLogo.svg';
import { NavLink } from "react-router-dom";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import enLocale from "../../assets/images/enLocale.png";
import zhLocale from "../../assets/images/zhLocale.png";
import { Error } from "@mui/icons-material";

const lstLocale = [
  {
    prefix: 'en',
    imgUrl: enLocale,
    name: 'English',
  },
  {
    prefix: 'zh',
    imgUrl: zhLocale,
    name: 'Hong Kong',
  }
];

export default function Login() {
  const classes = useStyles();
  const { t } = useTranslation(['account']);
  const [errorLogin, setErrorLogin] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: '',
      password: ''
    }
  });
  const [currentLocate, setCurrentLocate] = useState<any>(lstLocale.find((it: any) => it.prefix === i18n.language));

  useEffect(() => {
    if (i18n.language) {
      const locate: any = lstLocale.find((it: any) => it.prefix === i18n.language);
      if (!objectNullOrEmpty(locate)) {
        setCurrentLocate(locate);
      }
    }
  }, [i18n.language]);

  const onChangeLanguage = (e: any) => {
    i18n.changeLanguage(e.target.value);
  }

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
                {t('message.loginFail')}
              </div>}
              <Grid item xs={12}>
                <TextField {...register('username', { required: true })}
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
                    {t('enterUser')}
                    </div>
                }
              </Grid>
              <Grid item xs={12} sx={{ width: '100%' }}>
                <TextField {...register('password', { required: true })}
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
                    {t('enterPassword')}
                    </div>
                }
                <Box sx={{ float: 'right' }}>
                  <NavLink to={'/forgot-password'} style={{ textDecoration: 'none' }}>
                    <Typography fontSize={'small'}>
                      {t('forgotPassword')}
                    </Typography>
                  </NavLink>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Button
                  className={classes.MButton}
                  variant={'contained'}
                  type={'submit'}
                >
                  {t('login')}
                </Button>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Typography fontSize={'small'} ml={1} mr={1}>{t('noAccountLabel')} </Typography>
                <NavLink to={'/signup'} style={{ textDecoration: 'none' }}>
                  <Typography fontSize={'small'}>
                    {t('register')}
                  </Typography>
                </NavLink>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-start' }} mt={1}>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={objectNullOrEmpty(currentLocate) ? '' : currentLocate.prefix}
                    inputProps={{ sx: { fontSize: 'smaller' } }}
                    onChange={onChangeLanguage}
                  >
                    {
                      lstLocale.map((it: any) => {
                        return <MenuItem sx={{ fontSize: 'small' }} key={it.prefix}
                                         value={it.prefix}>{it.name}</MenuItem>;
                      })
                    }
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
      <TLoading open={loading}/>
    </Box>
  );
}