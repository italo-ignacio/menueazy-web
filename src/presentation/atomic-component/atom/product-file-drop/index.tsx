import { Add } from '@mui/icons-material';
import { api } from 'infra/http';
import { apiPaths } from 'main/config';
import { callToast, resolverError } from 'main/utils';
import { colors } from 'presentation/style';
import { setProductId } from 'store/product-id/slice';
import { useDispatch } from 'react-redux';
import { useRef, useState } from 'react';
import { useRestaurant } from 'data/hooks';
import type { ChangeEvent, DragEvent, FC } from 'react';
import type { Image } from 'domain/models';

interface ProductFileDropProps {
  limit: number;
  productId: number;
  images: Image[];
}

export const ProductFileDrop: FC<ProductFileDropProps> = ({ productId, images, limit }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const { restaurantId } = useRestaurant();
  const dispatch = useDispatch();

  const handleDragOver = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
  };

  const handleChange = async (
    dropEvent?: DragEvent<HTMLDivElement>,
    changeEvent?: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const newFiles: File[] = [];

    if (dropEvent) {
      if (dropEvent.dataTransfer?.files) newFiles.push(...dropEvent.dataTransfer.files);
    } else if (changeEvent)
      if (changeEvent.target?.files) newFiles.push(...changeEvent.target.files);

    const acceptedFiles = newFiles.filter((file) => file.type.startsWith('image/'));

    if (acceptedFiles.length === 0) return;

    if (acceptedFiles.length > limit) {
      callToast.error(`maximo de images 5 vc pode adicionar mais ${limit}`);
      return;
    }

    try {
      const formData = new FormData();

      acceptedFiles.forEach((item) => {
        formData.append('images', item);
      });

      const data = await api.post<Image[]>({
        body: formData,
        isFormData: true,
        route: apiPaths.productImage(restaurantId, productId)
      });

      dispatch(
        setProductId({
          imageList: [
            ...images,
            ...data.map((item, index) => ({
              ...item,
              url: URL.createObjectURL(acceptedFiles[index])
            }))
          ]
        })
      );
    } catch (error) {
      resolverError(error);
    }
    setIsDragging(false);
  };

  const onDrop = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    handleChange(event, undefined);
  };

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>): void => {
    handleChange(undefined, event);
  };
  const onDragEnter = (event: DragEvent<HTMLDivElement>): void => {
    event.stopPropagation();
    setIsDragging(true);
  };

  const onDragLeave = (event: DragEvent<HTMLDivElement>): void => {
    event.stopPropagation();

    const rect = event.currentTarget.getBoundingClientRect();
    const isOutside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;

    if (isOutside) setIsDragging(false);
  };

  return (
    <div
      className={
        'border-2 border-primary gap-4 hover:bg-primary/10 min-w-[90px] cursor-pointer text-primary border-dashed flex justify-between max-w-max flex-row items-center p-4 rounded-md'
      }
      onClick={(): void => {
        inputRef.current?.click();
      }}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={handleDragOver}
      onDrop={onDrop}
      style={{ backgroundColor: isDragging ? 'rgb(94 23 235 / 0.10)' : undefined }}
    >
      <div className={`${limit > 1 ? '' : 'w-full'} text-center`}>
        <Add sx={{ color: colors.primary, fontSize: 24 }} />
      </div>

      {limit > 1 ? (
        <div className={'w-full'}>
          <h2>Adicionar mais ({limit})</h2>
        </div>
      ) : null}

      <input
        accept={'image/*'}
        className={'hidden'}
        multiple={true}
        onChange={onChangeInput}
        ref={inputRef}
        type={'file'}
      />
    </div>
  );
};
