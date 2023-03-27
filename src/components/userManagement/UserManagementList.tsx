import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { AuthenticationService } from "../../services/access/AuthenticationService";
import { Settings } from "@mui/icons-material";
import UserManageSetting from "./UserManageSetting";
import { PREFIX_LOCALE, USER_ROLE } from "../../utils/enum/CommonEnum";
import MaterialReactTable, { MRT_Row } from "material-react-table";
import { stringNullOrEmpty } from "../../utils/Utils";
import i18n from "i18next";

import { MRT_Localization_EN } from 'material-react-table/locales/en';
import { MRT_Localization_ZH_HANS } from "material-react-table/locales/zh-Hans";
import { useTranslation } from "react-i18next";

const _ = require('lodash');

export default function UserManagementList() {
  const { t } = useTranslation(['userManagement']);
  const [lstUser] = useState(AuthenticationService.getListUserLocalStorage);
  const [userRows, setUserRows] = useState<any[]>([]);
  const [openSettingModal, setOpenSettingModal] = useState(false);
  const [currentUserLocal] = useState(AuthenticationService.getCurrentUser);
  const [currentUser, setCurrentUser] = useState({});

  const [currentLocale, setCurrentLocale] = useState(MRT_Localization_EN);

  useEffect(() => {
    if (!stringNullOrEmpty(i18n.language)) {
      switch (i18n.language) {
        case PREFIX_LOCALE.EN:
          setCurrentLocale(MRT_Localization_EN);
          break;
        case PREFIX_LOCALE.ZH:
          setCurrentLocale(MRT_Localization_ZH_HANS);
          break;
        default:
          break;
      }
    }
  }, [i18n.language]);

  const handleOpenSettingModal = async (userInfo: MRT_Row) => {
    await setCurrentUser(_.cloneDeep(userInfo.original));
    await setOpenSettingModal(true);
  };

  const handleCloseSettingModal = () => {
    setOpenSettingModal(false);
  };

  useEffect(() => {
    if (lstUser && lstUser.length > 0) {
      let rows: any[] = [];
      lstUser.map((it: any, index: number) => {
        if (it.username !== currentUserLocal.username && USER_ROLE.ADMIN !== it.role) {
          it.id = index;
          it.index = index + 1;
          rows.push(it);
        }
      });
      setUserRows(rows);
    }
  }, [lstUser]);

  const userColumns: any = [
    {
      accessorKey: 'action',
      header: ' ',
      Cell: (props: { renderedCellValue: any, row: MRT_Row }) => (
        <>
          <Settings/>
        </>
      ),
    },
    {
      accessorKey: 'index',
      header: t('no'),
    },
    {
      accessorKey: 'fullName',
      header: t('user'),
    },
    {
      accessorKey: 'role',
      header: t('role'),
      Cell: (props: { renderedCellValue: any, row: MRT_Row }) => (
        <div style={{ paddingLeft: '20px' }}>
          <Typography>{genRole(props.renderedCellValue)}</Typography>
        </div>
      ),
    }
  ];

  const genRole = (role: string) => {
    let valueGen = '';
    switch (role) {
      case USER_ROLE.ADMIN:
        valueGen = t('admin');
        break;
      case USER_ROLE.MANAGER:
        valueGen = t('manager');
        break;
      case USER_ROLE.USER:
        valueGen = t('user');
        break;
      default:
        valueGen = '';
    }
    return valueGen;
  };

  return (
    <div>
      <h4>{t('userList')}</h4>
      <Grid container>
        <Grid item xs={6}>
          <MaterialReactTable
            localization={currentLocale}
            columns={userColumns}
            data={userRows}
            enableTopToolbar={false}
            muiTableBodyRowProps={(props: { row: any }) => ({
              onClick: (event) => {
                handleOpenSettingModal(props.row);
              },
              sx: {
                cursor: 'pointer',
              },
            })}
          />
        </Grid>
      </Grid>
      <UserManageSetting
        open={openSettingModal}
        onClose={handleCloseSettingModal}
        userInfo={currentUser}
      />
    </div>
  );
};