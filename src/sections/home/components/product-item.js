import PropTypes from 'prop-types';
// @mui
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
// utils
import { fCurrency } from 'src/utils/format-number';
// components
import Label from 'src/components/label';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const coverUrl = 'https://images.unsplash.com/photo-1590496793929-36417d3117de?q=80&w=800';

export default function ProductItem({ product, setIsSelected, isSelected }) {
  const { id, name, hire_period_days, allowed_on_road, allows_heavy_waste } = product;
  const available = allowed_on_road && allows_heavy_waste ? true : false;
  const renderLabels = (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      sx={{ position: 'absolute', zIndex: 9, top: 16, right: 16 }}
    >
      <Label variant="filled" color="primary">
        {product.size} Yards
      </Label>
    </Stack>
  );
  const renderCenterLabel = (
    <Stack direction="row" alignItems="center" spacing={1} sx={{ position: 'absolute', zIndex: 9 }}>
      <Label variant="filled" color="warning">
        Private Property Only
      </Label>
    </Stack>
  );
  const renderImg = (
    <Box
      sx={{
        position: 'relative',
        p: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
      }}
      onClick={() => setIsSelected(isSelected === id ? null : id)}
    >
      {!available && renderCenterLabel}
      <Fab
        color="contained"
        size="small"
        className="add-cart-btn"
        sx={{
          right: 16,
          bottom: 16,
          zIndex: 9,
          opacity: isSelected === id ? 1 : 0, // Always visible when selected
          position: 'absolute',
          transition: (theme) =>
            theme.transitions.create('all', {
              easing: theme.transitions.easing.easeInOut,
              duration: theme.transitions.duration.shorter,
            }),
        }}
        onClick={() => setIsSelected(isSelected === id ? null : id)}
      >
        <Iconify
          color="primary"
          sx={{ color: 'primary.main' }}
          icon={isSelected === id ? 'solar:check-circle-bold' : 'ph:circle-light'}
          width={28}
        />
      </Fab>

      <Tooltip title={!available && 'Private Only'} placement="bottom-end">
        <Image
          alt={name}
          src={coverUrl}
          ratio="1/1"
          sx={{
            borderRadius: 1.5,
            ...(!available && {
              opacity: 0.48,
              filter: 'grayscale(1)',
            }),
          }}
        />
      </Tooltip>
    </Box>
  );

  const renderContent = (
    <Stack spacing={1.5} sx={{ p: 3, pt: 1 }}>
      <Box>
        <Typography color="inherit" variant="subtitle1" noWrap>
          {product?.size} Yard Skip
        </Typography>
        <Typography color="text.secondary" variant="body2" noWrap>
          {hire_period_days} day hire period
        </Typography>
      </Box>

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" spacing={0.5} sx={{ typography: 'h6', color: 'primary.lighter' }}>
          <Box component="span">{fCurrency(product?.price_before_vat)}</Box>
        </Stack>
      </Stack>
    </Stack>
  );

  return (
    <Card
      sx={{
        '&:hover .add-cart-btn': {
          opacity: 1,
        },
        ...(isSelected === id && {
          boxShadow: `0px 6px 12px rgba(0, 55, 193, 0.3), 0px 4px 8px rgba(0, 55, 193, 0.6) !important`,
        }),
        '&:hover': {
          bgcolor: 'background.paper',
          boxShadow: `0px 4px 12px rgba(0, 55, 193, 0.3), 0px 2px 4px rgba(0, 55, 193, 0.2)`,
        },
      }}
    >
      {renderLabels}

      {renderImg}
      {renderContent}
    </Card>
  );
}

ProductItem.propTypes = {
  product: PropTypes.object,
};
