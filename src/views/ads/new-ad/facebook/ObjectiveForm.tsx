/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

// material-ui
import { Grid, Typography, FormGroup } from '@material-ui/core';

// project imports
import { gridSpacing } from 'views/common/constant';

// project icon imports
import FacebookSvgIcon from 'assets/images/icons/facebook.svg';
import FacebookGraySvgIcon from 'assets/images/icons/facebook-gray.svg';
import SelectableCard from 'ui-component/cards/SelectableCard';

const ObjectiveForm = () => {
  const objectives = [
    {
      name: 'objective',
      id: 'brand-awareness',
      title: 'Brand awareness',
      value: 'BRAND_AWARENESS',
      defaultIcon: FacebookGraySvgIcon,
      activeIcon: FacebookSvgIcon,
      imgAlt: 'Facebook',
      description: 'Show your ads to people who are most likely to remember them.'
    },
    {
      name: 'objective',
      id: 'reach',
      title: 'Reach',
      value: 'REACH',
      defaultIcon: FacebookGraySvgIcon,
      activeIcon: FacebookSvgIcon,
      imgAlt: 'Facebook',
      description: 'Show your ads to the maximum number of people.'
    },
    {
      name: 'objective',
      id: 'traffic',
      title: 'Traffic',
      value: 'LINK_CLICKS',
      defaultIcon: FacebookGraySvgIcon,
      activeIcon: FacebookSvgIcon,
      imgAlt: 'Facebook',
      description: 'Send people to a website, app, or Facebook event, or let them tap to call you.'
    },
    {
      name: 'objective',
      id: 'engagement',
      title: 'Engagement',
      value: 'POST_ENGAGEMENT',
      defaultIcon: FacebookGraySvgIcon,
      activeIcon: FacebookSvgIcon,
      imgAlt: 'Facebook',
      description: 'Get more Page likes, event responses, or post reacts, comments or shares.'
    },
    {
      name: 'objective',
      id: 'lead-generation',
      title: 'Lead Generation',
      value: 'LEAD_GENERATION',
      defaultIcon: FacebookGraySvgIcon,
      activeIcon: FacebookSvgIcon,
      imgAlt: 'Facebook',
      description: 'Use forms, calls, or chats to gather info from people interested in your business.'
    }
  ];

  return (
    <FormGroup>
      <Grid container alignContent="center" justifyContent="center">
        <Typography variant="h1">What’s your objective?</Typography>
      </Grid>
      <Grid container spacing={gridSpacing} alignContent="center" sx={{ marginTop: '20px' }}>
        {objectives.map((objective) => (
          <Grid item sm={12} lg={4} key={objective.id}>
            <SelectableCard
              id={objective.id}
              name={objective.name}
              title={objective.title}
              value={objective.value}
              defaultIcon={objective.defaultIcon}
              activeIcon={objective.activeIcon}
              imgAlt={objective.imgAlt}
              description={objective.description}
            />
          </Grid>
        ))}
      </Grid>
    </FormGroup>
  );
};

export default ObjectiveForm;
