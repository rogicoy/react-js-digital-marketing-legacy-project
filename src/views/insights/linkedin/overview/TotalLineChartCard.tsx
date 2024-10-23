/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Theme, useTheme } from '@material-ui/core/styles';
import { Box, Card, CardContent, Typography } from '@material-ui/core';

// third party
import Chart, { Props as ChartProps } from 'react-apexcharts';

// style constant
const useStyles = makeStyles((theme: Theme) => ({
  content: {
    padding: 0,
    paddingBottom: '0 !important'
  }
}));

// ============================|| TOTAL LINE CHART CARD ||============================ //

export interface TotalLineChartCardProps {
  color?: string;
  bgColor?: string;
  boxShadow?: string;
  chartData?: ChartProps;
  title: string;
  value: string | number;
}

const TotalLineChartCard = ({ color, bgColor, boxShadow, chartData, title, value }: TotalLineChartCardProps) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card
      sx={{
        boxShadow
      }}
    >
      <CardContent className={classes.content}>
        <Box
          sx={{
            p: 2,
            color: color || '#fff',
            bgcolor: bgColor || theme.palette.primary.main,
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Box
            sx={{
              width: 1 / 2
            }}
          >
            {title && (
              <Typography
                variant="h4"
                sx={{
                  my: 2,
                  color: theme.palette.grey[400],
                  textTransform: 'uppercase',
                  fontWeight: 'normal'
                }}
              >
                {title}
              </Typography>
            )}
            {value && (
              <Typography variant="h1" color="inherit">
                {value}
              </Typography>
            )}
          </Box>
          {chartData && (
            <Box
              sx={{
                width: 1 / 2
              }}
            >
              <Chart {...chartData} />
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TotalLineChartCard;
