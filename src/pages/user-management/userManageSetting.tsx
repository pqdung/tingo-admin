import {
  Alert,
  Button, Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  Divider, FormControl, FormControlLabel, FormGroup,
  Grid,
  MenuItem,
  Select, Snackbar,
  Typography
} from "@mui/material";
import { useStyles } from "../../layouts/styles/makeTheme";
import { USER_ROLE } from "../../utils/enum/comonEnum";
import React, { useEffect, useState } from "react";
import { adminRole, objectNullOrEmpty } from "../../utils/utils";
import { AuthenticationService } from "../../services/access/AuthenticationService";
import { useTranslation } from "react-i18next";

const _ = require('lodash');

interface Props {
  open: boolean;
  onClose: () => void;
  userInfo: any;
}

export default function UserManageSetting(props: Props) {
  const classes = useStyles();
  const { open, onClose, userInfo } = props;
  const { t } = useTranslation(['userManagement']);
  const [openPopupModal, setOpenPopupModal] = React.useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<any>({});

  useEffect(() => {
    if (!objectNullOrEmpty(userInfo)) {
      setCurrentUser(_.cloneDeep(userInfo));
    }
  }, [userInfo]);

  const onChangeRole = (e: any) => {
    const currentUserUpdate = _.cloneDeep(currentUser);
    currentUserUpdate.role = e.target.value;
    setCurrentUser(currentUserUpdate);
  }

  const handleClosePopup = () => {
    setOpenPopupModal(false);
  };

  const handleSave = () => {
    const lstUser = AuthenticationService.getListUserLocalStorage();
    if (lstUser && lstUser.length > 0) {
      const lstUserFilter = lstUser.filter((it: any) => it.username !== currentUser.username);
      lstUserFilter.push(currentUser);
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      localStorage.setItem('lstUser', JSON.stringify(lstUserFilter));
      setOpenPopupModal(true);
      onClose();
    }
  }

  return (
    <div>
      <Dialog
        open={open}
        maxWidth='sm' fullWidth
      >
        <DialogContent>
          <h4>{t('roleAndPermission')}</h4>
          <Divider/>
          <Grid container spacing={2} p={3}>
            <Grid item xs={5} sx={{ display: adminRole() ? undefined : 'none' }}>
              <Typography>{t('role')}</Typography>
            </Grid>
            <Grid item xs={7} sx={{ display: adminRole() ? undefined : 'none' }}>
              <FormControl fullWidth className={classes.MSelect}>
                <Select
                  disabled={!adminRole()}
                  id="role"
                  name="role"
                  sx={{ width: '80%', mt: 1.5, ml: 1 }}
                  size={'small'}
                  value={objectNullOrEmpty(currentUser) ? '' : currentUser.role}
                  onChange={onChangeRole}
                  inputProps={{ 'aria-label': 'Without label' }}>
                  <MenuItem value={USER_ROLE.MANAGER}>
                    {t('manager')}
                  </MenuItem>
                  <MenuItem value={USER_ROLE.USER}>
                    {t('user')}
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={5}>
              <Typography>{t('permission')}</Typography>
            </Grid>
            <Grid item xs={7}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox
                    checked={Boolean(objectNullOrEmpty(currentUser) ? false : currentUser.permission.view)}
                    onChange={(e: any) => {
                      const currentUserUpdate = _.cloneDeep(currentUser);
                      currentUserUpdate.permission.view = e.target.checked;
                      setCurrentUser(currentUserUpdate);
                    }}
                  />}
                  label={t('view')}
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox
                    checked={Boolean(objectNullOrEmpty(currentUser) ? false : currentUser.permission.edit)}
                    onChange={(e: any) => {
                      const currentUserUpdate = _.cloneDeep(currentUser);
                      currentUserUpdate.permission.edit = e.target.checked;
                      setCurrentUser(currentUserUpdate);
                    }}
                  />}
                  label={t('edit')}
                />
              </FormGroup>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', mb: 5, mr: 5, ml: 5, mt: 1 }}>
          <Button
            id='btnConfirm'
            variant='contained'
            onClick={handleSave}
          >
            {t('save')}
          </Button>
          <Button
            id='btnCancel'
            variant='outlined'
            onClick={onClose}
          >
            {t('cancel')}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openPopupModal} autoHideDuration={2000} onClose={handleClosePopup}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={handleClosePopup} severity="success" sx={{ width: '100%' }}>
          {t('saveSuccess')}
        </Alert>
      </Snackbar>
    </div>
  );
};