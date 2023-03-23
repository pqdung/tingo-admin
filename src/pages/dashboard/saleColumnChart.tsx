import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';
import i18n from '../../locales/i18n';

interface Props {
  type: string;
}

const chartOptions = {
  chart: {
    type: 'bar',
    height: 430,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      columnWidth: '30%',
      borderRadius: 4,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 8,
    colors: ['transparent'],
  },
  yaxis: {
    title: {
      text: '$ (thousands)',
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter(val: any) {
        return `$ ${val} thousands`;
      },
    },
  },
  legend: {
    show: true,
    fontFamily: `'Public Sans', sans-serif`,
    offsetX: 10,
    offsetY: 10,
    labels: {
      useSeriesColors: false,
    },
    markers: {
      width: 16,
      height: 16,
      radius: '50%',
      offsexX: 2,
      offsexY: 2,
    },
    itemMargin: {
      horizontal: 15,
      vertical: 50,
    },
  },
  responsive: [
    {
      breakpoint: 600,
      options: {
        yaxis: {
          show: false,
        },
      },
    },
  ],
};

export default function SalesColumnChart({ type }: Props) {
  const theme = useTheme();
  const { t } = useTranslation(['dashboard']);
  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const warning = theme.palette.warning.main;
  const primaryMain = theme.palette.primary.main;
  const successDark = theme.palette.success.dark;

  const [series, setSeries] = useState([
    {
      name: t('netProfit'),
      data: [14, 20, 30, 16, 8, 11, 9],
    },
    {
      name: t('revenue'),
      data: [20, 16, 14, 24, 12, 15, 11],
    },
  ]);

  const [options, setOptions] = useState<any>(chartOptions);

  useEffect(() => {
    setOptions((prev: any) => ({
      ...prev,
      xaxis: {
        categories:
          type === 'month'
            ? [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ]
            : type === 'year'
            ? ['2019', '2020', '2021', '2022', '2023']
            : ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
      },
    }));
    setSeries([
      {
        name: t('netProfit'),
        data:
          type === 'month'
            ? [180, 90, 135, 114, 120, 145, 350, 440, 120, 600, 240, 80]
            : type === 'year'
            ? [1650, 4042, 5400, 2405, 3750]
            : [14, 20, 30, 16, 8, 11, 9],
      },
      {
        name: t('revenue'),
        data:
          type === 'month'
            ? [120, 45, 78, 150, 168, 99, 120, 30, 300, 280, 150, 50]
            : type === 'year'
            ? [1280, 3060, 2050, 3200, 4210]
            : [20, 16, 14, 24, 12, 15, 11],
      },
    ]);
  }, [type, i18n.language]);

  useEffect(() => {
    setOptions((prevState: any) => ({
      ...prevState,
      colors: [warning, primaryMain],

      yaxis: {
        labels: {
          style: {
            colors: [secondary],
          },
        },
      },
      grid: {
        borderColor: line,
      },
      tooltip: {
        theme: 'light',
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        labels: {
          colors: 'grey.500',
        },
      },
    }));
  }, [primary, secondary, line, warning, primaryMain, successDark]);

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={430}
      />
    </div>
  );
}
