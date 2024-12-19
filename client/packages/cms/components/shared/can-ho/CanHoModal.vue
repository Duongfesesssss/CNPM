<script setup lang="ts">

import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { CanHoService } from '~/packages/base/services/can-ho.service';
import { CanHoModel } from '~/packages/base/models/dto/response/can-ho/can-ho.model';

const thongTin = ref<CanHoModel>();
const confirm = useConfirm();
const toast = useToast();
const closeEscapeKeyModalInfo = ref<boolean>(true);

const props = defineProps({
  isVisible: {
    type: Boolean,
  },
  canHo: {
    type: CanHoModel,
  },
});
const internalVisible = computed({
  get() {
    return props.isVisible;
  },
  set() {
    handleHideModal();
  },
});


const schema = yup.object({
  
});

const { defineField, handleSubmit, errors, resetForm } = useForm({
  validationSchema: schema,
});

const [_id] = defineField('id');
const [dien_tich] = defineField('dien_tich');
const [mo_ta] = defineField('mo_ta');
const [ten_canho] = defineField('ten_canho');
const [so_phong] = defineField('so_phong');
const [trang_thai] = defineField('trang_thai');




const onSubmit = handleSubmit(async () => {
  const canHoDTO = {
    _id: _id.value,
    dien_tich: dien_tich.value,
    mo_ta: mo_ta.value,
    ten_canho: ten_canho.value,
    so_phong: so_phong.value,
    trang_thai: trang_thai.value,
  };

  ConfirmDialog.showConfirmDialog(
    confirm,
    `${
      canHoDTO._id
        ? 'Bạn có chắc muốn cập nhật thông tin căn hộ này?'
        : 'Bạn có chắc muốn thêm thông tin căn hộ này?'
    }`,
    'Xác nhận',
    'pi pi-question-circle',
    () => {
      if (canHoDTO._id != null) {
        CanHoService.update(canHoDTO as CanHoModel)
          .then((response) => {
            if (response?.status == EnumStatus.OK) {
              toast.add({
                severity: 'success',
                summary: 'Thành công',
                detail: 'Cập nhật thông tin căn hộ thành công!',
                life: 3000,
              });

              emit('reloadDataTable');
              handleHideModal();
            }
            else {
              toast.add({
                severity: 'error',
                summary: 'Thất bại',
                detail: 'Cập nhật thông tin căn hộ không thành công!',
                life: 3000,
              });

              handleHideModal();
            }
          })
          .catch(() => {
            console.error('Lỗi khi cập nhật:', errors);
            toast.add({
              severity: 'error',
              summary: 'Lỗi',
              detail: 'Đã có lỗi xảy ra, vui lòng thử lại!',
              life: 3000,
            });

            handleHideModal();
          });
      }
      else {
        CanHoService.insert(canHoDTO as CanHoModel)
          .then((response) => {
            if (response?.status == EnumStatus.OK) {
              toast.add({
                severity: 'success',
                summary: 'Thành công',
                detail: 'Thêm mới thông tin căn hộ thành công!',
                life: 3000,
              });

              emit('reloadDataTable');
              handleHideModal();
            }
            else {
              toast.add({
                severity: 'error',
                summary: 'Thất bại',
                detail: 'Thêm mới thông tin căn hộ không thành công!',
                life: 3000,
              });

              handleHideModal();
            }
          })
          .catch(() => {
            toast.add({
              severity: 'error',
              summary: 'Lỗi',
              detail: 'Đã có lỗi xảy ra, vui lòng thử lại!',
              life: 3000,
            });

            handleHideModal();
          });
      }
    },
    () => {},
    '',
    ' p-button-danger',
  );
});

watch(
  () => props.isVisible,
  () => {
    if (props.isVisible) {
      thongTin.value = props.canHo;
      console.log('thongtin bao', thongTin);
    }
  },
  { immediate: true },
);

watchEffect(() => {
  if (thongTin.value?._id != undefined) {
    _id.value = thongTin.value._id;
    dien_tich.value = thongTin.value?.dien_tich;
    mo_ta.value = thongTin.value?.mo_ta;
    ten_canho.value = thongTin.value?.ten_canho;
    so_phong.value = thongTin.value?.so_phong;
    trang_thai.value = thongTin.value?.trang_thai;

  }
});

const emit = defineEmits(['hideModal', 'reloadDataTable']);

const handleHideModal = () => {
  emit('hideModal');
};
</script>

<template>
  <ClientOnly>
    <Dialog
      v-model:visible="internalVisible"
      class="w-[320px] sm:w-[800px]"
      :header="`${
        props.canHo?.id === null || props.canHo?.id === undefined
          ? 'Thêm mới '
          : 'Cập nhật '
      } thông tin căn hộ`"
      :modal="true"
      :close-on-escape="closeEscapeKeyModalInfo"
    >
      <div>
        <form>
          <div class="flex flex-col gap-6">
            <div class="gap-4 grid grid-cols-1 sm:grid-cols-2">
              <div class="min-w-40">
                <label
                  for="donvi_phathanh_id"
                  class="block font-bold mb-3 requ  ired"
                >Tên căn hộ</label>
                <InputText
                  id="ten_canho"
                  v-model="ten_canho"
                  fluid
                  filter
                  show-clear
                  :invalid="errors.lon != null"
                  placeholder="Nhập tên căn hộ"
                />
                <small class="text-red-500">{{ errors.ten_tiengviet }}</small>
              </div>
              <div class="min-w-40">
                <label class="block font-bold mb-3">Số phòng</label>
                <InputText
                  id="so_phong"
                  v-model="so_phong"
                  fluid
                  for="so_phong"
                  filter
                  show-clear
                  placeholder="Nhập số phòng"
                />
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="min-w-40">
                <label class="block font-bold mb-3">Diện tích phòng</label>
                <InputText
                  id="level"
                  v-model="dien_tich"
                  fluid
                  filter
                  show-clear
                  placeholder="Nhập diện tích phòng"
                />
              </div>
              <div class="min-w-40">
                <label class="block font-bold mb-3">Mô tả</label>
                <InputText
                  id="huong_dichuyen"
                  v-model="mo_ta"
                  fluid
                  filter
                  show-clear
                  placeholder="Nhập mô tả"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
      <template #footer>
        <div
          class="p-dialog-footer mt-4"
          style="width: 779px"
        >
          <Button
            type="button"
            label="Đóng"
            icon="pi pi-times"
            severity="danger"
            @click="handleHideModal()"
          />
          <Button
            label="Lưu"
            icon="pi pi-check"
            type="submit"
            @click="onSubmit"
          />
        </div>
      </template>
    </Dialog>
  </ClientOnly>
</template>
