import { useTranslation } from 'react-i18next';
import type { FC } from 'react';
import { Button } from '@mui/material';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useAppSelector } from 'store';

export const HomeContent: FC = () => {
  const { t } = useTranslation('home');
  const { } = useAppSelector((state) => state.persist)

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-4 md:px-16 py-12 bg-white">
        <div className="flex flex-col gap-6 max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            {t('hero.title')}
          </h1>
          <p className="text-lg text-gray-600">
            {t('hero.subtitle')}
          </p>
          <Button 
            variant="contained" 
            color="primary"
            startIcon={<WhatsAppIcon />}
            size="large"
            sx={{ width: 'fit-content' }}
          >
            {t('hero.cta')}
          </Button>
        </div>
        <div className="mt-8 md:mt-0">
          <img 
            src="/images/whatsapp-interface.png" 
            alt="WhatsApp Interface" 
            className="w-full max-w-md rounded-lg shadow-xl"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-16 py-12 bg-gray-50">
        <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md">
          <RestaurantIcon sx={{ fontSize: 48, color: '#4CAF50', marginBottom: 2 }} />
          <h3 className="text-xl font-semibold mb-2">{t('features.1.title')}</h3>
          <p className="text-gray-600">{t('features.1.description')}</p>
        </div>
        <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md">
          <PhoneAndroidIcon sx={{ fontSize: 48, color: '#2196F3', marginBottom: 2 }} />
          <h3 className="text-xl font-semibold mb-2">{t('features.2.title')}</h3>
          <p className="text-gray-600">{t('features.2.description')}</p>
        </div>
        <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md">
          <QueryStatsIcon sx={{ fontSize: 48, color: '#FF9800', marginBottom: 2 }} />
          <h3 className="text-xl font-semibold mb-2">{t('features.3.title')}</h3>
          <p className="text-gray-600">{t('features.3.description')}</p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 md:px-16 py-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">{t('benefits.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <img 
                src="/images/sales-growth.png" 
                alt="Sales Growth" 
                className="w-16 h-16 object-contain"
              />
              <div>
                <h3 className="text-lg font-semibold mb-2">{t('benefits.1.title')}</h3>
                <p className="text-gray-600">{t('benefits.1.description')}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <img 
                src="/images/time-saving.png" 
                alt="Time Saving" 
                className="w-16 h-16 object-contain"
              />
              <div>
                <h3 className="text-lg font-semibold mb-2">{t('benefits.2.title')}</h3>
                <p className="text-gray-600">{t('benefits.2.description')}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <img 
                src="/images/customer-satisfaction.png" 
                alt="Customer Satisfaction" 
                className="w-16 h-16 object-contain"
              />
              <div>
                <h3 className="text-lg font-semibold mb-2">{t('benefits.3.title')}</h3>
                <p className="text-gray-600">{t('benefits.3.description')}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <img 
                src="/images/support.png" 
                alt="24/7 Support" 
                className="w-16 h-16 object-contain"
              />
              <div>
                <h3 className="text-lg font-semibold mb-2">{t('benefits.4.title')}</h3>
                <p className="text-gray-600">{t('benefits.4.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 md:px-16 py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">{t('cta.title')}</h2>
          <p className="text-lg text-gray-600 mb-8">{t('cta.description')}</p>
          <Button 
            variant="contained" 
            color="primary"
            size="large"
            sx={{ minWidth: 200 }}
          >
            {t('cta.button')}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white px-4 md:px-16 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <img 
              src="/images/logo-menu-easy.png" 
              alt="Menu Easy Logo" 
              className="h-8"
            />
            <p className="text-gray-400">{t('footer.description')}</p>
          </div>
          {[1, 2, 3].map((col) => (
            <div key={col} className="flex flex-col gap-4">
              <h4 className="font-semibold">{t(`footer.columns.${col}.title`)}</h4>
              <ul className="space-y-2">
                {[1, 2, 3, 4].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {t(`footer.columns.${col}.links.${item}`)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
};