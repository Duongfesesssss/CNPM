<script setup lang="ts">
import { ref } from 'vue';
import SharedMenuItem from './SharedMenuItem.vue';

const model = ref([
  {
    label: 'Trang chủ',
    items: [{ label: 'Thống kê', icon: 'pi pi-fw pi-home', to: '/cms' }],
  },
  {
    label: 'Quản lý',
    items: [
      {
        label: 'Hộ khẩu',
        icon: 'pi pi-fw pi-bolt',
        to: '/cms/ho-khau',
      },
      {
        label: 'Test book',
        icon: 'pi pi-fw pi-bolt',
        to: '/cms/book',
      },
      {
        label: 'Hệ thống',
        icon: 'pi pi-fw pi-wrench',
        to: '#',
        items: [
          {
            label: 'QL nhóm người dùng',
            icon: 'pi pi-fw pi-users',
            to: '/cms/user-group',
          },
          {
            label: 'QL người dùng',
            icon: 'pi pi-fw pi-user',
            to: '/cms/user',
          },
        ],
      },
    ],
    separator: null,
  },
]);
</script>

<template>
  <ul class="layout-menu">
    <template
      v-for="(item, i) in model"
      :key="item"
    >
      <SharedMenuItem
        v-if="!item.separator"
        :item="item"
        :index="i"
      />
      <li
        v-if="item.separator"
        class="menu-separator"
      />
    </template>
  </ul>
</template>

<style lang="scss" scoped></style>
