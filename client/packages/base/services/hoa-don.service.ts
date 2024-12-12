import {
    type RestData,
    type RestPagedDataTable,
  } from '../models/base-response.model';
  import type { HoaDonModel } from '../models/dto/response/hoa-don/hoa-don.model';
  import { BaseService } from './base.service';
  
  class _HoaDonService extends BaseService {
    async HoaDonDataTable(filterProject) {
      try {
        const res = await $api<RestPagedDataTable<HoaDonModel[]>>('/api/hoa-don/datatable', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(filterProject)
        });
          if (res) {
          return res;
        }
        console.error('Không nhận được phản hồi từ server:', res);
        return null;
      } catch (error) {
        console.error('Lỗi khi gọi API HoKhauDataTable:', error);
        throw error;
      }
    }
  
    async getHoaDonID(id?: string) {
      const res = await $api<RestPagedDataTable<HoaDonModel[]>>(
        `/api/hoa-don/${id}`,
        {
          method: 'GET',
        },
      );
  
      if (res && res.status === EnumStatus.OK) {
        return res;
      }
      return null;
    }
  
    async insert(entity: HoaDonModel) {
      const response = await $api<RestPagedDataTable<HoaDonModel[]>>(
        `/api/hoa-don`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(entity),
        },
      );
  
      if (response) {
        return response;
      }
  
      return null;
    }
  
    async update(entity: HoaDonModel) {
      const response = await $api<RestPagedDataTable<HoaDonModel[]>>(
        `/api/hoa-don`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(entity),
        },
      );
  
      if (response) {
        return response;
      }
  
      return null;
    }
  
    async delete(entity: HoaDonModel) {
      const response = await $api<RestPagedDataTable<HoaDonModel[]>>(
        `/api/hoa-don`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(entity),
        },
      );
  
      if (response) {
        return response;
      }
  
      return null;
    }
  }
  
  const HoaDonService = new _HoaDonService();
  export { HoaDonService };
  
  