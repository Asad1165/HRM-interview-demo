import { useEffect, useState } from 'react';
import { m } from 'framer-motion';

// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
//axios
import axios, { API_ENDPOINTS } from 'src/utils/axios';

// components
import { MotionViewport, varFade } from 'src/components/animate';
import { useSettingsContext } from 'src/components/settings';
import EmptyContent from 'src/components/empty-content';
import ProductItem from '../components/product-item';
import { ProductItemSkeleton } from '../components/product-skeleton';

// ----------------------------------------------------------------------
const data1 = [
  {
    id: 11554,
    size: 4,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 311,
    vat: 20,
    postcode: 'NR32',
    area: null,
    forbidden: false,
    created_at: '2021-04-06T17:04:42',
    updated_at: '2024-04-02T09:22:38',
    allowed_on_road: true,
    allows_heavy_waste: true,
  },
];
const data = [
  {
    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6',

    available: 72,
    priceSale: null,

    sizes: ['6', '7', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'],
    description:
      '\n<h6>Specifications</h6>\n<br/>\n<ol>\n  <li>Category</li>\n  <li>Shoes</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Manufacturer</li>\n  <li>Nike</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Serial Number</li>\n  <li>358607726380311</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Ships From</li>\n  <li>United States</li>\n</ol>\n\n<br/>\n<br/>\n\n<h6>Product Details</h6>\n<br/>\n<ul>\n  <li><p>The foam sockliner feels soft and comfortable</p></li>\n  <li><p>Pull tab</p></li>\n  <li><p>Not intended for use as Personal Protective Equipment</p></li>\n  <li><p>Colour Shown: White/Black/Oxygen Purple/Action Grape</p></li>\n  <li><p>Style: 921826-109</p></li>\n  <li><p>Country/Region of Origin: China</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Benefits</h6>\n<br/>\n<ul>\n  <li>\n    <p>Mesh and synthetic materials on the upper keep the fluid look of the OG while adding comfort</p>\n    and durability.\n  </li>\n  <li>\n    <p>Originally designed for performance running, the full-length Max Air unit adds soft, comfortable cushio</p>\n    ning underfoot.\n  </li>\n  <li><p>The foam midsole feels springy and soft.</p></li>\n  <li><p>The rubber outsole adds traction and durability.</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Delivery and Returns</h6>\n<br/>\n<p>Your order of $200 or more gets free standard delivery.</p>\n<br/>\n<ul>\n  <li><p>Standard delivered 4-5 Business Days</p></li>\n  <li><p>Express delivered 2-4 Business Days</p></li>\n</ul>\n<br/>\n<p>Orders are processed and delivered Monday-Friday (excluding public holidays)</p>\n\n',
    createdAt: '2025-03-20T11:24:25.744Z',
    saleLabel: {
      enabled: true,
      content: 'SALE',
    },
    name: 'Zoom Freak 2',
    price: 25.18,
    coverUrl: 'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',

    colors: ['#1890FF'],

    newLabel: { enabled: false, content: 'NEW' },
  },
];

export default function HomeView() {
  const settings = useSettingsContext();

  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState([]);
  const [isSelected, setIsSelected] = useState(null);

  const getAllProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(API_ENDPOINTS.skipList);
      console.log(data);
      setProductData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const renderSkeleton = (
    <>
      {[...Array(16)].map((_, index) => (
        <ProductItemSkeleton key={index} />
      ))}
    </>
  );

  const renderList = (
    <>
      {productData?.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          setIsSelected={setIsSelected}
          isSelected={isSelected}
        />
      ))}
    </>
  );

  const renderNotFound = <EmptyContent filled title="No Data" sx={{ py: 10 }} />;

  return (
    <Container
      component={MotionViewport}
      maxWidth={settings.themeStretch ? false : 'lg'}
      sx={{
        mb: 15,
      }}
    >
      <Stack flexDirection="column" alignItems="center" justifyContent="center" sx={{ mb: 5 }}>
        <Typography variant="h2" sx={{ my: 3 }}>
          Choose Your Skip Size
        </Typography>

        <Typography
          sx={{
            mx: 'auto',
            maxWidth: 640,
            color: 'text.secondary',
          }}
        >
          Select the skip size that best suits your needs
        </Typography>
      </Stack>
      <Box
        sx={{ position: 'relative' }}
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
      >
        {loading ? renderSkeleton : renderList}
      </Box>
    </Container>
  );
}
