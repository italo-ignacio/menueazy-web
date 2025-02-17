/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpStatusCode } from 'domain/enums';
import { LANGUAGE_STORAGE_KEY } from 'i18n';
import { removeUndefined } from 'main/utils';
import { store } from 'store';
import type { ApiProps } from 'domain/protocol';

const baseUrl = import.meta.env.VITE_API_URL;

export const fetchApi = async <T>(params: ApiProps): Promise<T> => {
  const accessToken = params.token || store.getState().persist.accessToken;

  const body: any = params.isFormData ? params.body : JSON.stringify(params.body);
  const headers: any = { lang: localStorage.getItem(LANGUAGE_STORAGE_KEY) };

  if (accessToken) Object.assign(headers, { Authorization: `Bearer ${accessToken}` });

  if (!params.isFormData)
    Object.assign(headers, { 'Content-Type': 'application/json;charset=UTF-8' });

  const id = params.id ? `/${params.id}` : '';

  const queryParams =
    params.queryParams && Object.values(removeUndefined(params.queryParams)).length
      ? `?${new URLSearchParams(removeUndefined(params.queryParams))}`
      : '';

  console.log(headers);

  const response = await fetch(`${baseUrl}${params.route}${id}${queryParams}`, {
    body,
    headers,
    method: params.method
  });

  // if ((response.status as unknown as HttpStatusCode) === HttpStatusCode.unauthorized) {
  //   window.history.back();
  //   return null as T;
  // }

  if ((response.status as unknown as HttpStatusCode) === HttpStatusCode.noContent) return null as T;

  const data = await response.json();

  if (response.ok) return data.payload;

  throw Object(data);
};
