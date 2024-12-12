import {
    type RestData,
    type RestPagedDataTable,
  } from '../models/base-response.model';
  import type { CanHoModel } from '../models/dto/response/can-ho/can-ho.model';
  import { BaseService } from './base.service';
  
  class _CanHoService extends BaseService {
    async CanHoDataTable(filterProject) {
      try {
        const res = await $api<RestPagedDataTable<CanHoModel[]>>('/api/can-ho/datatable', {
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
        console.error('Lỗi khi gọi API CanHoDataTable:', error);
        throw error;
      }
    }
  
    async getHoKhauID(id?: string) {
      const res = await $api<RestPagedDataTable<CanHoModel[]>>(
        `/api/can-ho/${id}`,
        {
          method: 'GET',
        },
      );
  
      if (res && res.status === EnumStatus.OK) {
        return res;
      }
      return null;
    }
  
    async insert(entity: CanHoModel) {
      const response = await $api<RestPagedDataTable<CanHoModel[]>>(
        `/api/can-ho`,
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
  
    async update(entity: CanHoModel) {
      const response = await $api<RestPagedDataTable<CanHoModel[]>>(
        `/api/can-ho`,
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
  
    async delete(entity: CanHoModel) {
      const response = await $api<RestPagedDataTable<CanHoModel[]>>(
        `/api/can-ho`,
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
  
  const CanHoService = new _CanHoService();
  export { CanHoService };
  
  