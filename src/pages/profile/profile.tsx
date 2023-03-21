import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import { UserAccount } from "./userAccount";
import { UserProfile } from "./userProfile";
import { UserPassword } from "./userPassword";
import { useTranslation } from "react-i18next";

interface TabPanelProps {
  children?: any;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export function Profile() {
  const [value, setValue] = useState(0);
  const { t } = useTranslation('profile');

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label={t('accountHeader')} {...a11yProps(0)} />
          <Tab label={t('profileHeader')} {...a11yProps(1)} />
          <Tab label={t('changePasswordHeader')} {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <UserAccount/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UserProfile/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <UserPassword/>
      </TabPanel>
    </div>
  );
}