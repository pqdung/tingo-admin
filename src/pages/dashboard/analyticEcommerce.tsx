import { Box, Chip, Grid, Stack, Typography } from '@mui/material';
import ApiOutlinedIcon from '@mui/icons-material/ApiOutlined';
import WaterfallChartOutlinedIcon from '@mui/icons-material/WaterfallChartOutlined';
import MainCard from '../../components/mainCard';
import { useTranslation } from 'react-i18next';

interface Props {
  color?: any;
  title: string;
  count: string;
  percentage?: number;
  isLoss?: boolean;
  extra: string;
}

export default function AnalyticEcommerce({
  color,
  title,
  count,
  percentage,
  isLoss,
  extra,
}: Props) {
  const { t } = useTranslation(['dashboard']);
  return (
    <MainCard contentSX={{ p: 2.25 }} sx={{ p: 2 }}>
      <Stack spacing={0.5}>
        <Typography variant="h6" color="textSecondary">
          {title}
        </Typography>
        <Grid container alignItems="center">
          <Grid item>
            <Typography variant="h4" color="inherit">
              {count}
            </Typography>
          </Grid>
          {percentage && (
            <Grid item>
              <Chip
                variant="outlined"
                color={color ? color : 'primary'}
                icon={
                  <>
                    {!isLoss && (
                      <ApiOutlinedIcon
                        style={{ fontSize: '0.75rem', color: 'inherit' }}
                      />
                    )}
                    {isLoss && (
                      <WaterfallChartOutlinedIcon
                        style={{ fontSize: '0.75rem', color: 'inherit' }}
                      />
                    )}
                  </>
                }
                label={`${percentage}%`}
                sx={{ ml: 1.25, pl: 1 }}
                size="small"
              />
            </Grid>
          )}
        </Grid>
      </Stack>
      <Box sx={{ pt: 2.25 }}>
        <Typography variant="caption" color="textSecondary">
          {t('You made an extra')}{' '}
          <Typography
            component="span"
            variant="caption"
            sx={{ color: `${color || 'primary'}.main` }}>
            {extra}
          </Typography>{' '}
          {t('this year')}
        </Typography>
      </Box>
    </MainCard>
  );
}
