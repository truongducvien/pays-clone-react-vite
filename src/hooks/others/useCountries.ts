import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface Country {
  id: number;
  name: string;
  phone_code: string;
  code: string;
}

export const useCountries = () => {
  return useQuery({
    queryKey: ['useCountries'],
    queryFn() {
      return axios.get<Country[]>('https://payscommon87134.blob.core.windows.net/front-end/countries.json').then(
        ({ data }) =>
          data?.map((it) => ({
            ...it,
            phone_code: it.phone_code.startsWith('+') ? it.phone_code : `+${it.phone_code}`,
          })) || []
      );
    },
    staleTime: Infinity,
  });
};
