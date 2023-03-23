import { useState } from 'react';
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Grid,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import IncomeAreaChart from './barChart';
import MonthlyBarChart from './MonthlyBarChart';
import ReportAreaChart from './reportAreChart';
import SalesColumnChart from './saleColumnChart';
import MainCard from '../../components/mainCard';
import AnalyticEcommerce from './analyticEcommerce';
import { useTranslation } from 'react-i18next';

const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem',
};

const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none',
};

const DashboardDefauft = () => {
  const { t } = useTranslation(['dashboard']);
  const [value, setValue] = useState('week');
  const [slot, setSlot] = useState('week');

  const status = [
    {
      value: 'week',
      label: t('This Week'),
    },
    {
      value: 'month',
      label: t('This Month'),
    },
    {
      value: 'year',
      label: t('This Year'),
    },
  ];

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">{t('dashboard')}</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce
          title={t('totalTransaction')}
          count="2,65,214"
          percentage={59.3}
          extra="20,000"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce
          title={t('totalUsers')}
          count="93,497"
          percentage={70.5}
          extra="9,400"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce
          title={t('totalOder')}
          count="12,800"
          percentage={27.4}
          isLoss
          color="warning"
          extra="1,443"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce
          title={t('totalSales')}
          count="$50,078"
          percentage={27.4}
          isLoss
          color="warning"
          extra="$26,565"
        />
      </Grid>

      <Grid
        item
        md={8}
        sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }}
      />

      {/* row 2 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">{t('uniqueVisitor')}</Typography>
          </Grid>
          <Grid item>
            <Stack direction="row" alignItems="center" spacing={0}>
              <Button
                size="small"
                onClick={() => setSlot('month')}
                color={slot === 'month' ? 'primary' : 'secondary'}
                variant={slot === 'month' ? 'outlined' : 'text'}
                sx={{ textTransform: 'none' }}>
                {t('Month')}
              </Button>
              <Button
                size="small"
                onClick={() => setSlot('week')}
                color={slot === 'week' ? 'primary' : 'secondary'}
                variant={slot === 'week' ? 'outlined' : 'text'}
                sx={{ textTransform: 'none' }}>
                {t('Week')}
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <MainCard content={false} sx={{ mt: 1.5 }}>
          <Box sx={{ pt: 1, pr: 2, pb: 3.3 }}>
            <IncomeAreaChart slot={slot} />
          </Box>
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">{t('incomeOverview')}</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 1.5 }} content={false}>
          <Box sx={{ p: 2, pb: 0 }}>
            <Stack spacing={2}>
              <Typography variant="h6" color="textSecondary">
                {t('This Week Statistics')}
              </Typography>
              <Typography variant="h3">$10,350</Typography>
            </Stack>
          </Box>
          <MonthlyBarChart />
        </MainCard>
      </Grid>

      {/* row 3 */}
      <Grid item xs={12} md={12} lg={12} sx={{ p: 2, pr: 0 }}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">{t('Analytics Report')}</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
            <ListItemButton divider>
              <ListItemText primary={t('Company Finance Growth')} />
              <Typography variant="h5">+45.14%</Typography>
            </ListItemButton>
            <ListItemButton divider>
              <ListItemText primary={t('Company Expenses Ratio')} />
              <Typography variant="h5">0.58%</Typography>
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary={t('Business Risk Cases')} />
              <Typography variant="h5">Low</Typography>
            </ListItemButton>
          </List>
          <ReportAreaChart />
        </MainCard>
      </Grid>

      <Grid item xs={12} md={7} lg={7}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">{t('Sales Report')}</Typography>
          </Grid>
          <Grid item>
            <TextField
              id="standard-select-currency"
              size="small"
              select
              value={value}
              onChange={(e) => setValue(e.target.value)}
              sx={{
                '& .MuiInputBase-input': { py: 0.5, fontSize: '0.875rem' },
              }}>
              {status.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <MainCard sx={{ mt: 1.75, p: 2, pb: 0 }}>
          <Stack spacing={1.5} sx={{ mb: -12 }}>
            <Typography variant="h6" color="secondary">
              {t('Net Profit')}
            </Typography>
            <Typography variant="h4">
              ${value === 'month' ? 2614 : value === 'year' ? 17247 : 108}
            </Typography>
          </Stack>
          <SalesColumnChart type={value} />
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={5}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">{t('Transaction History')}</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <List
            component="nav"
            sx={{
              px: 0,
              py: 0,
              '& .MuiListItemButton-root': {
                py: 1.5,
                '& .MuiAvatar-root': avatarSX,
                '& .MuiListItemSecondaryAction-root': {
                  ...actionSX,
                  position: 'relative',
                },
              },
            }}>
            <ListItemButton divider>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    color: 'success.main',
                    bgcolor: 'success.lighter',
                  }}>
                  <CardGiftcardOutlinedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle1">
                    {t('Transaction')} #002434
                  </Typography>
                }
                secondary="Today, 2:00 AM"
              />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                  <Typography variant="subtitle1" noWrap>
                    + $1,860
                  </Typography>
                  <Typography variant="h6" color="secondary" noWrap>
                    93%
                  </Typography>
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
            <ListItemButton divider>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    color: 'primary.main',
                    bgcolor: 'primary.lighter',
                  }}>
                  <MessageOutlinedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle1">
                    {t('Transaction')} #984947
                  </Typography>
                }
                secondary="5 August, 1:45 PM"
              />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                  <Typography variant="subtitle1" noWrap>
                    + $604
                  </Typography>
                  <Typography variant="h6" color="secondary" noWrap>
                    16%
                  </Typography>
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    color: 'error.main',
                    bgcolor: 'error.lighter',
                  }}>
                  <SettingsOutlinedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle1">
                    {t('Transaction')} #988784
                  </Typography>
                }
                secondary="7 hours ago"
              />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                  <Typography variant="subtitle1" noWrap>
                    + $956
                  </Typography>
                  <Typography variant="h6" color="secondary" noWrap>
                    18,6%
                  </Typography>
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
          </List>
        </MainCard>
        <MainCard sx={{ mt: 2 }}>
          <Stack spacing={3}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Stack>
                  <Typography variant="h5" noWrap>
                    {t('Help & Support Chat')}
                  </Typography>
                  <Typography variant="caption" color="secondary" noWrap>
                    {t('Typical replay within 5 min')}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
            <Button
              size="small"
              variant="contained"
              sx={{ textTransform: 'capitalize' }}>
              {t('Need Help')}?
            </Button>
          </Stack>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default DashboardDefauft;
