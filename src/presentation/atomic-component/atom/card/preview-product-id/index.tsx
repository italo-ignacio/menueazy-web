import { Circle, Star } from '@mui/icons-material';
import { PriceWithDiscount } from 'presentation/atomic-component/atom/price-with-discount';
import { colors } from 'presentation/style';
import { useAppSelector } from 'store';
import { useTranslation } from 'react-i18next';
import Carousel from 'react-material-ui-carousel';
import type { FC } from 'react';

export const PreviewProductIdCard: FC = () => {
  const { t } = useTranslation('restaurant');
  const { product } = useAppSelector((state) => state.productId);

  if (!product) return null;

  return (
    <div className={'flex gap-4 flex-col shadow-base border rounded relative'}>
      <Carousel
        IndicatorIcon={<Circle sx={{ fontSize: '15px', margin: '0 1px' }} />}
        activeIndicatorIconButtonProps={{ style: { color: colors.gray[700] } }}
        autoPlay={true}
        indicatorContainerProps={{ className: 'absolute h-[35px] z-10 bottom-0 left-0' }}
        indicatorIconButtonProps={{ style: { color: colors.gray[300] } }}
        interval={3000}
        navButtonsAlwaysInvisible={!!(product?.imageList && product?.imageList?.length <= 1)}
        swipe={true}
      >
        {product?.imageList?.map((image) => (
          <img
            key={image.id}
            alt={' '}
            className={'w-full h-[250px] rounded-md object-cover'}
            src={image.url}
          />
        ))}
      </Carousel>

      <div className={'flex flex-wrap absolute top-2 right-2 z-10 gap-2 items-center'}>
        {product?.highlight ? <Star sx={{ color: colors.yellow }} /> : null}
      </div>

      <div className={'flex flex-col pt-1 p-4 gap-3'}>
        <div className={'flex items-center gap-1'}>
          <h2 className={'text-xl font-semibold break-words w-full'}>{product.name}</h2>
        </div>

        <PriceWithDiscount
          discount={product.discount}
          finishDiscountAt={product.finishDiscountAt}
          price={product.price}
          startDiscountAt={product.startDiscountAt}
        />

        <div className={'flex items-center gap-1'}>
          <h2 className={'break-words w-full'}>{product.description}</h2>
        </div>

        <div className={'flex gap-2 flex-wrap justify-between'}>
          <div className={'flex flex-wrap items-center gap-3'}>
            <div className={'flex items-center gap-1'}>
              <Star className={'text-[#ff9100]'} color={'inherit'} />

              {product?.avgRate ? (
                <span className={'font-bold'}>{product?.avgRate?.toFixed(1)}</span>
              ) : null}
            </div>

            <div className={'flex items-center gap-1 text-gray-600'}>
              <span>{product?.totalRate ?? 0}</span>

              <span>
                {product?.totalRate === 1
                  ? t('product.table.review_one')
                  : t('product.table.review')}
              </span>
            </div>
          </div>

          <span>{t('product.table.sold', { count: product?.totalOrder ?? 0 })}</span>
        </div>

        <div className={'flex flex-wrap items-center gap-2 w-full'}>
          {product.categoryList?.map((category) => {
            return (
              <div key={category.id} className={'p-1 px-4 max-h-min rounded bg-primary text-white'}>
                {category.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
