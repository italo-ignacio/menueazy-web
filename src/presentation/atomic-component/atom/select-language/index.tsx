/* eslint-disable @typescript-eslint/no-restricted-imports */
import { ArrowDropDown, Check } from '@mui/icons-material';
import { Button } from '@mui/material';
import { type FC, type ReactNode, useState } from 'react';
import { LANGUAGE_STORAGE_KEY } from 'i18n';
import { SimpleMenu } from '../simple-menu';
import { setCurrency } from 'store/persist/slice';
import { useAppSelector } from 'store';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import type { CurrencyCode } from 'domain/models';

export type Langs = 'en' | 'es' | 'pt';

const languageName = {
  en: 'English',
  es: 'Español',
  pt: 'Português'
};

const currencyByLang = {
  en: 'USD',
  es: 'MXN',
  pt: 'BRL'
} as const;

const currencyName = {
  BRL: 'BRL R$',
  MXN: 'MXN $',
  USD: 'USD $'
};

export const SelectLanguage: FC = () => {
  const [open, setOpen] = useState(false);
  const { currency } = useAppSelector((state) => state.persist);

  const dispatch = useDispatch();

  const {
    t,
    i18n: { language, changeLanguage }
  } = useTranslation();

  const languageItem = (lang: Langs, openElement?: boolean): ReactNode => {
    if (openElement)
      return (
        <div
          className={
            'flex gap-1 border px-1 min-h-[36px] cursor-pointer items-center min-w-[135px]'
          }
        >
          <img alt={lang} height={30} src={`/${lang}-flag.png`} width={30} />
          <span className={'ml-1'}>{currencyName[currency]}</span>

          <span className={'ml-auto'}>
            <ArrowDropDown />
          </span>
        </div>
      );

    return (
      <div
        className={`flex gap-3 border p-1 px-4 cursor-pointer items-center min-w-[190px] 
          min-h-10 ${lang === language?.slice(0, 2) ? 'bg-primary/20 text-primary' : 'hover:bg-gray-150'}`}
        onClick={(): void => {
          if (lang !== language?.slice(0, 2)) {
            changeLanguage(lang);
            localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
            dispatch(setCurrency(currencyByLang[lang]));
          }
        }}
      >
        <img alt={lang} height={30} src={`/${lang}-flag.png`} width={30} />
        {languageName[lang]}

        {lang === language?.slice(0, 2) ? (
          <span className={'ml-auto'}>
            <Check />
          </span>
        ) : null}
      </div>
    );
  };

  const currencyItem = (curren: CurrencyCode): ReactNode => {
    return (
      <div
        className={`flex gap-3 border p-1 px-4 cursor-pointer items-center min-w-[186px] min-h-10 
          ${curren === currency ? 'bg-primary/20 text-primary' : 'hover:bg-gray-150'}
          `}
        onClick={(): void => {
          if (curren !== currency) dispatch(setCurrency(curren));
        }}
      >
        {currencyName[curren]}

        {curren === currency ? (
          <span className={'ml-auto'}>
            <Check />
          </span>
        ) : null}
      </div>
    );
  };

  return (
    <SimpleMenu
      isOpen={open}
      openElement={languageItem(language?.slice(0, 2) as Langs, true)}
      setIsOpen={setOpen}
      side={'bottom'}
    >
      <div className={'flex gap-4 px-4'}>
        <div className={'flex flex-col gap-3 p-2 py-4 text-center'}>
          <h2 className={'text-lg font-semibold mb-1'}>{t('selectLanguage')}</h2>
          {languageItem('en')}
          {languageItem('pt')}
          {languageItem('es')}
        </div>

        <div className={'flex flex-col gap-3 p-2 py-4 text-center'}>
          <h2 className={'text-lg font-semibold mb-1'}>{t('selectCurrency')}</h2>
          {currencyItem('USD')}
          {currencyItem('BRL')}
          {currencyItem('MXN')}
        </div>
      </div>

      <div className={'flex items-center justify-center p-2 pb-5'}>
        <Button onClick={(): void => setOpen(false)} sx={{ minWidth: '150px' }}>
          {t('confirm')}
        </Button>
      </div>
    </SimpleMenu>
  );
};
