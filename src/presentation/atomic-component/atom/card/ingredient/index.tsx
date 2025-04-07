import type { FC } from 'react';
import type { Ingredient } from 'domain/models';

export const IngredientCard: FC<Ingredient> = ({ ...item }) => {
  return (
    <div className={'flex gap-4 flex-col shadow-base border rounded'}>
      <img
        key={item.id}
        alt={' '}
        className={'w-full h-[200px] rounded-md object-cover'}
        src={item.imageUrl}
      />

      {item.name}
    </div>
  );
};
