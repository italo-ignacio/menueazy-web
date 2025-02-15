import {
  Circle,
  MoveToInboxOutlined,
  NearMeOutlined,
  PlaceOutlined,
  ScheduleOutlined
} from '@mui/icons-material';
import { ImageModal } from 'presentation/atomic-component/molecule/modal/image';
import { colors } from 'presentation/style';
import type { FC, ReactNode } from 'react';

interface AvailableAssetsCardProps {
  title: ReactNode | string;
}

export const AvailableAssetsCard: FC<AvailableAssetsCardProps> = ({ title }) => {
  const getItems = (): ReactNode => {
    if (String(title).length % 2 === 0)
      return (
        <div className={'flex justify-center'}>
          <div className={'flex gap-0.5 text-sm font-semibold justify-center'}>
            <NearMeOutlined sx={{ fontSize: 20 }} />
            <span>SP</span>
          </div>
        </div>
      );

    if (String(title).length % 3 === 0)
      return (
        <div className={'flex justify-between'}>
          <div className={'flex gap-0.5 text-sm font-semibold justify-center'}>
            <MoveToInboxOutlined sx={{ fontSize: 20 }} />
            <span>20 itens</span>
          </div>

          <div className={'flex gap-0.5 text-sm font-semibold justify-center'}>
            <NearMeOutlined sx={{ fontSize: 20 }} />
            <span>SP</span>
          </div>
        </div>
      );

    return (
      <div className={'flex justify-between'}>
        <div className={'flex gap-0.5 text-sm font-semibold justify-center'}>
          <PlaceOutlined sx={{ fontSize: 20 }} />
          <span>Centro Log.</span>
        </div>

        <div className={'flex gap-0.5 text-sm font-semibold justify-center'}>
          <MoveToInboxOutlined sx={{ fontSize: 20 }} />
          <span>20 itens</span>
        </div>

        <div className={'flex gap-0.5 text-sm font-semibold justify-center'}>
          <NearMeOutlined sx={{ fontSize: 20 }} />
          <span>SP</span>
        </div>
      </div>
    );
  };

  const getA = (): ReactNode => {
    const randomNumber = Math.floor(Math.random() * 4) + 1;

    if (randomNumber === 1)
      return (
        <>
          <Circle sx={{ color: colors.green, fontSize: 10 }} />{' '}
          <span className={'text-green'}>Aprovado</span>
        </>
      );

    if (randomNumber === 2)
      return (
        <>
          <Circle color={'primary'} sx={{ fontSize: 10 }} />{' '}
          <span className={'text-primary'}>Em Análise</span>
        </>
      );

    if (randomNumber === 3)
      return (
        <>
          <Circle color={'error'} sx={{ fontSize: 10 }} />{' '}
          <span className={'text-red'}>Reprovado</span>
        </>
      );

    return (
      <>
        <Circle color={'primary'} sx={{ fontSize: 10 }} />{' '}
        <span className={'text-primary'}>Disponível</span>
      </>
    );
  };

  return (
    <div
      className={
        'flex flex-col w-full tablet:w-[30%] laptop:w-[23%] desktop:w-[18%] rounded-xl shadow-base'
      }
    >
      <ImageModal className={'w-full h-[200px] rounded object-fill'} url={'/teste-imagem.png'} />

      <div
        className={
          'flex flex-col bg-white rounded-xl rounded-t-[20px] -mt-12 p-5 pt-[15px] gap-4 relative'
        }
      >
        <div className={'flex gap-2 text-sm items-center justify-end absolute right-3'}>
          {getA()}
        </div>

        <div className={'flex flex-col gap-1 mt-7 justify-between h-full'}>
          <div className={'flex flex-col gap-1'}>
            <h3 className={'text-primary font-semibold text-sm'}>
              NI <span className={'font-bold'}>10985001</span>
            </h3>

            <p>Máquina de Costura Reta L-202 Playa com Lançadeira Grande</p>
          </div>

          <h3 className={'text-primary font-semibold text-sm'}>
            Por <span className={'font-bold'}>{title}</span>
          </h3>
        </div>

        {getItems()}

        <div className={'flex gap-2 text-sm font-semibold justify-center'}>
          <ScheduleOutlined sx={{ fontSize: 20 }} />
          <span>23/01/2025 ~ 30/01/2025</span>
        </div>

        {/* <RegisterInterestModal
          id={''}
          imageUrl={'/teste-imagem.png'}
          name={'Máquina de Costura Reta L-202 Playa com Lançadeira Grande'}
        /> */}
      </div>
    </div>
  );
};
