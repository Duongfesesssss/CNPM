import {
    type RestData,
    type RestPagedDataTable,
  } from '../models/base-response.model';
  import type { KhoanThuModel } from '../models/dto/response/khoan-thu/khoan-thu.model';
  import { BaseService } from './base.service';
  
  class _KhoanThuService extends BaseService {
    async KhoanThuTheoHoDataTable(filterProject) {
      try {
        const res = await $api<RestPagedDataTable<KhoanThuModel[]>>('/api/khoan-thu/datatable', {
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
  
    async getKhoanThuTheoHoID(id?: string) {
      const res = await $api<RestPagedDataTable<KhoanThuModel[]>>(
        `/api/khoan-thu/${id}`,
        {
          method: 'GET',
        },
      );
  
      if (res && res.status === EnumStatus.OK) {
        return res;
      }
      return null;
    }
  
    async insert(entity: KhoanThuModel) {
      const response = await $api<RestPagedDataTable<KhoanThuModel[]>>(
        `/api/khoan-thu`,
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
  
    async update(entity: KhoanThuModel) {
      const response = await $api<RestPagedDataTable<KhoanThuModel[]>>(
        `/api/khoan-thu`,
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
  
    async delete(entity: KhoanThuModel) {
      const response = await $api<RestPagedDataTable<KhoanThuModel[]>>(
        `/api/khoan-thu`,
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
  
  const KhoanThuService = new _KhoanThuService();
  export { KhoanThuService };
  
  