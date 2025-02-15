import { dimensions } from 'main/config';

export const scrollTo = (id: string): void => {
  const element = document.getElementById(id);

  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;

    const headerHeight = window.innerWidth >= dimensions.laptop ? 0 : 63;

    const offsetPosition = elementPosition - 20 - headerHeight;

    window.scrollTo({
      behavior: 'smooth',
      top: offsetPosition
    });
  }
};
