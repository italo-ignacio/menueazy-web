/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Delete, Star } from '@mui/icons-material';
import { type FC, useState } from 'react';
import { api } from 'infra/http';
import { apiPaths } from 'main/config';
import { resolverError } from 'main/utils';
import { setProductId } from 'store/product-id/slice';
import { useDispatch } from 'react-redux';
import { useRestaurant } from 'data/hooks';
import type { Image } from 'domain/models';

interface ProductIdGeneralImageFormProps {
  image: Image;
  productId: number;
  images: Image[];
}

export const ProductIdGeneralImageForm: FC<ProductIdGeneralImageFormProps> = ({
  image,
  productId,
  images
}) => {
  const [hovered, setHovered] = useState(false);
  const { restaurantId } = useRestaurant();
  const dispatch = useDispatch();

  const handleDelete = async (): Promise<void> => {
    try {
      await api.delete({
        id: image.id,
        route: apiPaths.productImage(restaurantId, productId)
      });

      dispatch(setProductId({ imageList: images.filter((item) => item.id !== image.id) }));
    } catch (error) {
      resolverError(error);
    }
  };

  const handleUpdate = async (): Promise<void> => {
    try {
      await api.put({
        body: { primary: true },
        id: image.id,
        route: apiPaths.productImage(restaurantId, productId)
      });

      const ordered = images.reduce<Image[][]>(
        (acc, item) => {
          item.id === image.id
            ? acc[0].push({ ...item, primary: true })
            : acc[1].push({ ...item, primary: false });
          return acc;
        },
        [[], []]
      );

      dispatch(setProductId({ imageList: [...ordered[0], ...ordered[1]] }));
    } catch (error) {
      resolverError(error);
    }
  };

  return (
    <div
      className={'relative'}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        alt={' '}
        className={`h-[75px] w-[90px] object-cover rounded-md border-4 ${image.primary ? 'border-primary' : 'border-transparent'}`}
        src={image.url}
      />

      {hovered ? (
        <span
          className={
            'flex justify-between w-full items-center p-1 absolute wfull h- bg-gray-200/85 rounded-md z-50 top-0 right-0'
          }
        >
          <Star className={'cursor-pointer text-yellow'} onClick={handleUpdate} />
          <Delete className={'cursor-pointer'} color={'error'} onClick={handleDelete} />
        </span>
      ) : null}
    </div>
  );
};
