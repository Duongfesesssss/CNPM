import {
    type RestData,
    type RestPagedDataTable,
  } from '../models/base-response.model';
  import type { KhoanThuTheoHoModel } from '../models/dto/response/khoan-thu-theo-ho/khoan-thu-theo-ho.model';
  import { BaseService } from './base.service';
  
  class _KhoanThuTheoHoService extends BaseService {
    async KhoanThuTheoHoDataTable(filterProject) {
      try {
        const res = await $api<RestPagedDataTable<KhoanThuTheoHoModel[]>>('/api/khoan-thu-theo-ho/datatable', {
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
      const res = await $api<RestPagedDataTable<KhoanThuTheoHoModel[]>>(
        `/api/khoan-thu-theo-ho/${id}`,
        {
          method: 'GET',
        },
      );
  
      if (res && res.status === EnumStatus.OK) {
        return res;
      }
      return null;
    }
  
    async insert(entity: KhoanThuTheoHoModel) {
      const response = await $api<RestPagedDataTable<KhoanThuTheoHoModel[]>>(
        `/api/khoan-thu-theo-ho`,
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
  
    async update(entity: KhoanThuTheoHoModel) {
      const response = await $api<RestPagedDataTable<KhoanThuTheoHoModel[]>>(
        `/api/khoan-thu-theo-ho`,
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
  
    async delete(entity: KhoanThuTheoHoModel) {
      const response = await $api<RestPagedDataTable<KhoanThuTheoHoModel[]>>(
        `/api/khoan-thu-theo-ho`,
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
  
  const KhoanThuTheoHoService = new _KhoanThuTheoHoService();
  export { KhoanThuTheoHoService };
  
  