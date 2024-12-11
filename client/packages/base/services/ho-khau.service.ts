import {
  type RestData,
  type RestPagedDataTable,
} from '../models/base-response.model';
import type { HoKhauModel } from '../models/dto/response/ho-khau/ho-khau.model';
import { BaseService } from './base.service';

class _HoKhauService extends BaseService {
  async HoKhauDataTable(
  ) {
    const res = await $api<RestPagedDataTable<HoKhauModel[]>>('/api/ho-khau/datatable', {
        method: 'POST',
        body: {},
      });
    
    if (res) {
      return res;
      console.log('Response:', res);

    }
    return null;
  }

}

const HoKhauService = new _HoKhauService();
export { HoKhauService };
