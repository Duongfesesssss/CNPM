import type { HoKhauModel } from "../ho-khau/ho-khau.model";

class CanHoModel {
    id?: string;
    tang?: number;
    dien_tich?: string;
    ho_khau?: HoKhauModel;
    mo_ta?: string;
    noi_cap?: string;
    ten_canho?: string;
  }

  export { CanHoModel };
  