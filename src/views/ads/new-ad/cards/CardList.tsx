/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

// material-ui
import { Grid } from '@material-ui/core';

// project imports
import { IAdItem } from '../interface';
import CardListItem from './CardListItem';

interface ICardListProps {
  list: IAdItem[];
}

const CardList: React.FC<ICardListProps> = (props) => {
  const { list } = props;
  return (
    <Grid container spacing={3}>
      {list.map((item) => (
        <Grid key={item.id} item xs={12} sm={12} lg={6}>
          <CardListItem {...item} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CardList;
