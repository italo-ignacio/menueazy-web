import { Link } from 'react-router-dom';
import { SelectLanguage, ToggleMenu, ToggleTheme } from 'presentation/atomic-component/atom';
import { paths } from 'main/config';
import { usePath, useTheme } from 'data/hooks';
import { useTranslation } from 'react-i18next';
import type { FC } from 'react';

export const PublicHeader: FC = () => {
  const { t } = useTranslation('header');
  const { firstPathname } = usePath();

  const theme = useTheme();
  const itemList = [
    { label: 'Home', path: paths.home },
    { label: t('aboutUs'), path: paths.aboutUs },
    { label: t('plans'), path: paths.plans },
    { label: t('contact'), path: paths.contact },
    { label: t('panel'), path: paths.login }
  ];

  return (
    <header
      className={
        'flex items-center h-[80px] sticky top-0 bg-white dark:bg-gray-900 dark:text-white border-b dark:border-gray-900 border-gray-125'
      }
    >
      <div className={'flex justify-between items-center p-4 w-full z-40 max-w-[1200px] mx-auto'}>
        <Link to={paths.home}>
          <img
            alt={'Menu Eazy'}
            className={'max-h-[65px]'}
            src={`/logo${theme === 'dark' ? '-white' : ''}.png`}
          />
        </Link>

        <div className={'hidden laptop:flex items-center justify-center gap-10'}>
          {itemList.map((item) => (
            <Link
              key={item.path}
              className={`flex flex-col dark:text-white relative hover:text-primary dark:hover:text-white ${firstPathname === item.path ? 'text-primary' : ''}`}
              to={item.path}
            >
              {item.label}

              <span
                className={
                  firstPathname === item.path
                    ? 'bg-primary h-[2px] w-full absolute bottom-[-3px]'
                    : ''
                }
              />
            </Link>
          ))}

          <SelectLanguage />
          <ToggleTheme />
        </div>

        <div className={'laptop:hidden flex flex-col items-center justify-center'}>
          <ToggleMenu />
        </div>
      </div>
    </header>
  );
};
