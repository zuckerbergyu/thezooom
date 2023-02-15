import { useQuery } from 'react-query';
import request from 'apis/request';

// 주문 목록 api
export const useGetOrderList = () =>
  useQuery(
    ['useGetOrderList'],
    async () => {
      const params = {
        endDate: new Date()
          .toLocaleDateString()
          .replace(/\./g, '')
          .replace(/\s/g, '-'),
        searchType: 'order', // TODO: order/cancel
        startDate: '2020-01-01',
      };

      const { data } = await request.post('/api/mypage/orderList', params);
      return data;
    },
    {
      enabled: false,
    }
  );
