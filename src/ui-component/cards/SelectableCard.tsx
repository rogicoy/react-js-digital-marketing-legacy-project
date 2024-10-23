/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

// material-ui imports
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, CardHeader, Theme, Typography } from '@material-ui/core';

// third-party imports
import { Field } from 'formik';

// project imports
import Chip from 'ui-component/extended/Chip';
import { ISelectableCard } from 'types';

const useStyles = makeStyles((theme: Theme) => ({
  radioButton: {
    opacity: '0',
    visibility: 'hidden',
    '&:checked + .MuiPaper-root': {
      border: `1px solid ${theme.palette.primary.main}`,
      '& .facebook-default-icon': {
        display: 'none'
      },
      '& .facebook-active-icon': {
        display: 'block'
      }
    }
  },
  card: {
    '&:hover': {
      border: `1px solid ${theme.palette.primary.main}`,
      cursor: 'pointer'
    }
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: theme.palette.text.dark
  },
  cardActiveIcon: {
    display: 'none'
  },
  cardContent: {
    paddingTop: '0px'
  }
}));

const SelectableCard = ({
  name,
  id,
  title,
  value,
  defaultIcon,
  activeIcon,
  imgAlt,
  description,
  minHeight = '185px',
  isRecommended
}: ISelectableCard) => {
  const classes = useStyles();

  return (
    <label htmlFor={id}>
      <Field className={classes.radioButton} type="radio" name={name} id={id} value={value} />
      <Card variant="outlined" classes={{ root: classes.card }} sx={{ minHeight }}>
        <CardHeader
          avatar={
            <>
              <img className="facebook-default-icon" src={defaultIcon} alt={imgAlt} />
              <img className={`${classes.cardActiveIcon} facebook-active-icon`} src={activeIcon} alt={imgAlt} />
            </>
          }
          title={
            <>
              {title}
              {isRecommended && <Chip size="small" label="Recommended" variant="filled" chipcolor="success" sx={{ marginLeft: '8px' }} />}
            </>
          }
          classes={{ title: classes.cardTitle }}
        />
        <CardContent classes={{ root: classes.cardContent }}>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </label>
  );
};

export default SelectableCard;
