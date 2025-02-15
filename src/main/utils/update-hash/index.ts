export interface HashParams {
  name: string;
  value: string;
}

interface updateHashProps {
  params: HashParams[];
  resetAll?: boolean;
}

export const updateHash = (data: updateHashProps): void => {
  // eslint-disable-next-line @typescript-eslint/init-declarations
  let params: URLSearchParams;

  if (data.resetAll) params = new URLSearchParams();
  else {
    const hash = window.location.hash.slice(1);

    params = new URLSearchParams(hash);
  }

  data.params.forEach(({ name, value }) => {
    params.set(name, value);
  });

  window.location.hash = params.toString();
};
