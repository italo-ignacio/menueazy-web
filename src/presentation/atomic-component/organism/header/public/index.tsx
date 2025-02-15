import { Link } from 'react-router-dom';
import { SelectLanguage, ToggleMenu } from 'presentation/atomic-component/atom';
import { paths } from 'main/config';
import { usePath } from 'data/hooks';
import { useTranslation } from 'react-i18next';
import type { FC } from 'react';

export const PublicHeader: FC = () => {
  const { t } = useTranslation('header');
  const { firstPathname } = usePath();

  const itemList = [
    { label: 'Home', path: paths.home },
    { label: t('aboutUs'), path: paths.aboutUs },
    { label: t('plans'), path: paths.plans },
    { label: t('contact'), path: paths.contact },
    { label: t('panel'), path: paths.login }
  ];

  return (
    <header className={'flex items-center h-[80px] sticky top-0 bg-white border-b border-gray-125'}>
      <div className={'flex justify-between items-center p-4 w-full z-40 max-w-[1200px] mx-auto'}>
        <Link to={paths.home}>
          <img alt={'Menu Eazy'} className={'max-h-[65px]'} src={'/logo.png'} />
        </Link>

        <div className={'hidden laptop:flex items-center justify-center gap-10'}>
          {itemList.map((item) => (
            <Link
              key={item.path}
              className={
                firstPathname === item.path
                  ? 'text-primary underline underline-offset-8'
                  : 'hover:text-primary'
              }
              to={item.path}
            >
              {item.label}
            </Link>
          ))}

          <SelectLanguage />
        </div>

        <div className={'laptop:hidden flex flex-col items-center justify-center'}>
          <ToggleMenu />
        </div>
      </div>
    </header>
  );
};
