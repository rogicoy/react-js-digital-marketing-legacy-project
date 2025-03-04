/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { sum } from 'lodash';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme, styled } from '@material-ui/core/styles';
import { Fab, Badge, IconButton } from '@material-ui/core';

// assets
import ShoppingCartTwoToneIcon from '@material-ui/icons/ShoppingCartTwoTone';
import { DefaultRootStateProps } from 'types';
import { CartProductStateProps } from 'types/cart';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 0,
    top: 3,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px'
  }
}));

// ==============================|| CART ITEMS - FLOATING BUTTON ||============================== //

const FloatingCart = () => {
  const theme = useTheme();
  const cart = useSelector((state: DefaultRootStateProps) => state.cart);
  const totalQuantity = sum(cart.checkout.products.map((item: CartProductStateProps) => item.quantity));

  return (
    <Fab
      component={Link}
      to="/e-commerce/checkout"
      size="large"
      sx={{
        top: '25%',
        position: 'fixed',
        right: 0,
        zIndex: theme.zIndex.speedDial,
        boxShadow: theme.customShadows.warning,
        bgcolor: 'warning.main',
        color: 'warning.light',
        borderRadius: '8px',
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        '&:hover': {
          bgcolor: 'warning.dark',
          color: 'warning.light'
        }
      }}
    >
      <IconButton disableRipple aria-label="cart" sx={{ '&:hover': { bgcolor: 'transparent' } }} size="large">
        <StyledBadge showZero badgeContent={totalQuantity} color="error">
          <ShoppingCartTwoToneIcon sx={{ color: 'grey.800' }} />
        </StyledBadge>
      </IconButton>
    </Fab>
  );
};

export default FloatingCart;
