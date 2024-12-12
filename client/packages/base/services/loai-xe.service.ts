import {
    type RestData,
    type RestPagedDataTable,
  } from '../models/base-response.model';
  import type { LoaiXeModel } from '../models/dto/response/loai-xe/loai-xe.model';
  import { BaseService } from './base.service';
  
  class _LoaiXeService extends BaseService {
    async LoaiXeDataTable(filterProject) {
      try {
        const res = await $api<RestPagedDataTable<LoaiXeModel[]>>('/api/loai-xe/datatable', {
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
  
    async getLoaiXeID(id?: string) {
      const res = await $api<RestPagedDataTable<LoaiXeModel[]>>(
        `/api/loai-xe/${id}`,
        {
          method: 'GET',
        },
      );
  
      if (res && res.status === EnumStatus.OK) {
        return res;
      }
      return null;
    }
  
    async insert(entity: LoaiXeModel) {
      const response = await $api<RestPagedDataTable<LoaiXeModel[]>>(
        `/api/loai-xe`,
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
  
    async update(entity: LoaiXeModel) {
      const response = await $api<RestPagedDataTable<LoaiXeModel[]>>(
        `/api/loai-xe`,
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
  
    async delete(entity: LoaiXeModel) {
      const response = await $api<RestPagedDataTable<LoaiXeModel[]>>(
        `/api/loai-xe`,
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
  
  const LoaiXeService = new _LoaiXeService();
  export { LoaiXeService };
  
  