import { Add } from '@mui/icons-material';
import { QueryName, apiPaths } from 'main/config';
import { api } from 'infra/http';
import { callToast, resolverError } from 'main/utils';
import { colors } from 'presentation/style';
import { queryClient } from 'infra/lib';
import { useRef, useState } from 'react';
import { useRestaurant } from 'data/hooks';
import type { ChangeEvent, DragEvent, FC } from 'react';

interface ProductFileDropProps {
  limit: number;
  productId: number;
}

export const ProductFileDrop: FC<ProductFileDropProps> = ({ productId, limit }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const { restaurantId } = useRestaurant();

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

      await api.post({
        body: formData,
        isFormData: true,
        route: apiPaths.productImage(restaurantId, productId)
      });

      queryClient.invalidateQueries(QueryName.product);
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
        'border-2 border-primary gap-4 hover:bg-primary/10 min-w-[90px] cursor-pointer text-primary border-dashed flex justify-between max-w-max flex-col tablet:flex-row items-center p-4 rounded-md'
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
