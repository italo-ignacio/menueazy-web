import { IconRender } from 'presentation/atomic-component/atom';
import type { FC } from 'react';

interface ProductIdTabsProps {
  tabSelected: 'ADDITIONAL' | 'GENERAL' | 'INGREDIENT';
}

export const ProductIdTabs: FC<ProductIdTabsProps> = ({ tabSelected }) => {
  const tabList = [
    {
      active: ['INGREDIENT', 'ADDITIONAL'],
      icon: 'FormatIndentDecrease',
      subtitle: 'Etapa 1',
      title: 'Visão Geral',
      value: 'GENERAL'
    },
    { active: ['INGREDIENT', 'ADDITIONAL'], icon: '', subtitle: '', title: 'line-1' },
    {
      active: ['ADDITIONAL'],
      icon: 'fastfood',
      subtitle: 'Etapa 2',
      title: 'Ingredientes',
      value: 'INGREDIENT'
    },
    { active: ['ADDITIONAL'], icon: '', subtitle: '', title: 'line-2' },
    { icon: 'FormatLineSpacing', subtitle: 'Etapa 3', title: 'Adicionais', value: 'ADDITIONAL' }
  ];

  return (
    <div className={'flex justify-center gap-8 px-8'}>
      {tabList.map((item) => (
        <div
          key={item.title}
          className={`flex items-center ${item.title.startsWith('line') ? 'w-full max-w-[1 50px]' : 'min-w-max'}`}
        >
          {item.title.startsWith('line') ? (
            <div className={'h-[2px] w-full rounded-full bg-gray-350'}>
              <div
                className={`h-[2px] rounded-full ease-in-out transition-[width] duration-1000 ${item?.active?.includes(tabSelected) ? 'bg-primary w-full' : 'bg-primary w-[0%]'}`}
              />
            </div>
          ) : (
            <div className={'flex gap-4 items-center'}>
              <div
                className={`flex items-center justify-center rounded-md p-1.5 
                ${tabSelected === item.value || item?.active?.includes(tabSelected) ? 'bg-primary text-white' : 'bg-gray-250 text-gray-600'}`}
              >
                <IconRender
                  name={item?.active?.includes(tabSelected) ? 'checkCircle' : item.icon}
                  sx={{ fontSize: '28px' }}
                />
              </div>

              <div className={'flex flex-col'}>
                <span className={'text-sm'}>{item.subtitle}</span>
                <h3 className={'font-semibold text-lg'}>{item.title}</h3>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
