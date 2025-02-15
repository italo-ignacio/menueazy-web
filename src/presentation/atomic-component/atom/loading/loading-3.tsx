import type { FC } from 'react';

export const Loading3: FC = () => {
  return (
    <div className={'flex flex-col items-center justify-center absolute top-0 w-full h-dvh aa'}>
      <style>
        {`
        :root {
          --effect: hover 1.5s linear infinite;
        } 
        
        .aa{
          div {
            text-align: center;
          }

          p {
            display: inline-block;
            text-transform: uppercase;
            text-align: center;
            font-size: 4em;
            font-family: arial;
            font-weight: 600;
            transform: scale(.5);
            color: #121212;
            -webkit-text-stroke: 2px gray;
          }

          p:nth-child(1) {
            animation: var(--effect);
          }

          p:nth-child(2) {
            animation: var(--effect) .1s;
          }

          p:nth-child(3) {
            animation: var(--effect) .2s;
          }

          p:nth-child(4) {
            animation: var(--effect) .3s;
          }

          p:nth-child(5) {
            animation: var(--effect) .4s;
          }

          p:nth-child(6) {
            animation: var(--effect) .5s;
          }

          p:nth-child(7) {
            animation: var(--effect) .6s;
          }

           p:nth-child(8) {
            animation: var(--effect) .7s;
          }

           p:nth-child(9) {
            animation: var(--effect) .8s;
          }

           p:nth-child(10) {
            animation: var(--effect) .9s;
          }
        }
       

        @keyframes hover {
          0% {
            transform: scale(.5);
            color: #121212;
            -webkit-text-stroke: 2px gray;
          }

          20% {
            transform: scale(1);
            color: pink;
            -webkit-text-stroke: 3px red;
            filter: drop-shadow(0 0 1px black)drop-shadow(0 0 1px black)drop-shadow(0 0 3px red)drop-shadow(0 0 5px red)hue-rotate(10turn);
          }

          50% {
            transform: scale(.5);
            color: #121212;
            -webkit-text-stroke: 2px gray;
          }
        }
                    `}
      </style>

      <div>
        <p>c</p>
        <p>a</p>
        <p>r</p>
        <p>r</p>
        <p>e</p>
        <p>g</p>
        <p>a</p>
        <p>n</p>
        <p>d</p>
        <p>o</p>
      </div>
    </div>
  );
};
