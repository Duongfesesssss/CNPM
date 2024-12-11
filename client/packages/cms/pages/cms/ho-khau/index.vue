<template>
  <div class="p-card">
    <ToolBar class="mb-6">
      <template #start>
        <div class="flex flex-column justify-center">
          <Breadcrumb
            :home="home"
            :model="items"
          >
            <template #item="{ item, props }">
              <router-link
                v-if="item.route"
                v-slot="{ href, navigate }"
                :to="item.route"
                custom
              >
                <a
                  :href="href"
                  v-bind="props.action"
                  @click="navigate"
                >
                  <span :class="[item.icon, 'text-color']" />
                  <span class="text-primary font-semibold">{{ item.label }}</span>
                </a>
              </router-link>
              <a
                v-else
                :href="item.url"
                :target="item.target"
                v-bind="props.action"
              >
                <span class="text-surface-700 dark:text-surface-0">{{ item.label }}</span>
              </a>
            </template>
          </Breadcrumb>
        </div>
      </template>
      <template #end>
        <div class="flex items-center gap-2">
          <div>
            <Button
              label="Thêm mới"
              icon="pi pi-plus"
              class="mr-2"
            />
          </div>
        </div>
      </template>
    </ToolBar>

    <DataTable
      ref="dt"
      v-model:expandedRows="expandedRows"
      v-model:rows="filterProject.rows"
      :first="filterProject.first"
      data-key="id"
      column-resize-mode="expand"
      show-gridlines
      :total-records="totalRecords"
      :value="dataHoKhau"
      removable-sort
      :loading="loading"
      :rows-per-page-options="[1, 10, 20, 50]"
      :lazy="true"
      sort-field="ngay_phathanh"
      :sort-order="-1"
      paginator
      scrollable
      paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      current-page-report-template="hiển thị {first} đến {last} trong {totalRecords} kế hoạch"
      @page="onPage($event as PageEvent)"
      @sort="onSort($event as SortEvent)"
    >
      <template #header>
        <div class="grid grid-cols-1 xl:grid-cols-5 md:grid-cols-3 gap-4 mb-1">
          <div class="col-span-1">
            <IconField icon-position="left">
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText
                v-model="keyWords"
                placeholder="Tìm kiếm"
                class="w-full"
              />
            </IconField>
            <span class="text-red-500">{{ errors.keyWords }}</span>
          </div>
          <div class="col-span-1">
            <Button
              type="button"
              icon="pi pi-filter"
              label="Tìm kiếm"
              class="w-full"
              @click="timKiem"
            />
          </div>
          <div class="col-span-1">
            <Button
              type="button"
              icon="pi pi-filter-slash"
              label="Bỏ lọc"
              outlined
              severity="danger"
              class="w-full"
              @click="clearFilter()"
            />
          </div>
        </div>
      </template>
      <template #empty>
        <div class="text-center">
          <span class="font-bold">Không có hộ khẩu nào!</span>
        </div>
      </template>
      <Column
        expander
        style="padding: 10px; width: 2rem"
      />
      <Column
        class="text-center"
        body-style="text-align:center"
      >
        <template #header>
          <span class="m-auto"><b>STT</b></span>
        </template>
        <template #body="slotProps">
          {{ getRowSTT(slotProps.index) }}
        </template>
      </Column>

      <Column
        field="ma_ho_khau"
        header="Số hộ khẩu"
        sortable
      />
      <Column
        field="so_thanh_vien"
        header="Số thành viên"
        sortable
      >
        <template #body="slotProps">
          <b>{{ slotProps.data.so_thanh_vien }}</b>
        </template>
      </Column>
      <Column
        field="dia_chi_thuong_tru"
        header="Địa chỉ thường trú"
        sortable
      >
      <template #body="slotProps">
          <b>{{ slotProps.data.dia_chi_thuong_tru }}</b>
        </template>
      </Column>
      <Column
        field="noi_cap"
        header="Nơi cấp"
        :show-filter-match-modes="false"
        sortable
      >
        <template #body="slotProps">
          {{ slotProps.data.noi_cap || '' }}
        </template>
      </Column>
      <Column
        field="ngay_cap"
        header="Ngày cấp"
        :show-filter-match-modes="false"
        sortable
      >
      <template #body="slotProps">
          {{ slotProps.data.ngay_cap || '' }} 
        </template>
      </Column>
      <Column
        :exportable="false"
        style="min-width: 9rem"
        body-style="text-align:center"
        :frozen="true"
        align-frozen="right"
      >
        <template #header>
          <span class="m-auto"><b>Thao tác</b></span>
        </template>
        <template #body="slotProps">
          <div class="flex justify-center items-center space-x-4">
            <Button
              v-tooltip="'Chỉnh sửa kế hoạch'"
              icon="pi pi-pencil"
              outlined
              rounded
              severity="warn"
              class="mr-2"
              @click="onEditProject(slotProps.data)"
            />
            <Button
              v-tooltip="'Xoá kế hoạch'"
              icon="pi pi-trash"
              outlined
              rounded
              severity="danger"
              class="mr-2"
              @click="confirmDeleteProject(slotProps.data)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import * as yup from 'yup';
import { useForm } from 'vee-validate';
import { useToast } from 'primevue/usetoast';
import { useDialog } from 'primevue/usedialog';
import { useConfirm } from 'primevue/useconfirm';
import type { RouteLocationPathRaw } from 'vue-router';
import type { PageEvent, SortEvent } from '~/packages/base/models/event';
import { HoKhauService } from '~/packages/base/services/ho-khau.service';
import type { HoKhauModel } from '~/packages/base/models/dto/response/ho-khau/ho-khau.model';

definePageMeta({
  layout: 'cms-default',
});

const route = useRoute();
const phanLoaiId = ref();
phanLoaiId.value = route.query.phanLoaiId;
const expandedRows = ref();
const home = ref({
  icon: 'pi pi-home',
  route: '/cms',
});


const getRowSTT = (index: number): number => {
  return filterProject.value.first + index + 1;
};


const toast = useToast();
const dialog = useDialog();
const confirm = useConfirm();
const dataHoKhau = ref<HoKhauModel[]>([]);


const dt = ref();
const totalRecords = ref(0);
const filter = ref();

const schema = yup.object({
  keyWords: yup
    .string()
    .max(256, 'Tối đa 256 ký tự!')
});

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: schema,
});
const [keyWords] = defineField('keyWords');
const filterProject = ref({
  rows: 10,
  first: 0,
  page: 0,
  keyword: '',
  nam_tailieu: 0,
  sortField: 'ngay_phathanh',
  sortOrder: 'desc',
});



const clearFilter = () => {
  setTimeout(() => {
    reloadDataTable();
    keyWords.value = '';
  }, 200);
};


const loading = ref(false);

const onLoadTable = () => {
  loading.value = true;
  HoKhauService.HoKhauDataTable()
    .then((res) => {
      console.log(res);
      dataHoKhau.value = res?.data || [];
      totalRecords.value = res?.totalRecords ?? 0;
      console.log(totalRecords);
    })
    .catch((error) => {
      console.error('Error loading data:', error);
    })
    .finally(() => {
      loading.value = false;
    });
};

const reloadDataTable = () => {
  loading.value = true;
  onLoadTable();
};


const onPage = (event: PageEvent) => {
  filterProject.value.first = event.first;
  reloadDataTable();
};

const onSort = (event: SortEvent) => {
  filterProject.value.sortField = event.sortField ?? '';
  if (event.sortOrder != null) {
    filterProject.value.sortOrder = event.sortOrder === 1 ? 'asc' : 'desc';
  }
  else {
    filterProject.value.sortOrder = '';
  }
  reloadDataTable();
};

onMounted(() => {
  onLoadTable();
});

const timKiem = handleSubmit(async () => {
  filter.value.keyword = keyWords.value;
  filterProject.value.first = 0;
  reloadDataTable();
});
</script>

<style lang="scss" scoped></style>
