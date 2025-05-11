<template>
  <div :class="{ hidden }" class="pagination-container">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :background="background"
      :layout="layout"
      :page-sizes="pageSizes"
      :pager-count="pagerCount"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { scrollTo } from '@/utils/scrollTo'

interface PaginationEvent {
  page: number
  limit: number
}

const props = withDefaults(
  defineProps<{
    total: number
    page?: number
    limit?: number
    pageSizes?: number[]
    pagerCount?: number
    layout?: string
    background?: boolean
    autoScroll?: boolean
    hidden?: boolean
  }>(),
  {
    page: 1,
    limit: 20,
    pageSizes: () => [10, 20, 30, 50],
    pagerCount: () => (document.body.clientWidth < 992 ? 5 : 7),
    layout: 'total, sizes, prev, pager, next, jumper',
    background: true,
    autoScroll: true,
    hidden: false,
  },
)

const emit = defineEmits<{
  (e: 'update:page', value: number): void
  (e: 'update:limit', value: number): void
  (e: 'pagination', payload: PaginationEvent): void
}>()

const currentPage = computed<number>({
  get: () => props.page,
  set: (val: number) => emit('update:page', val),
})

const pageSize = computed<number>({
  get: () => props.limit,
  set: (val: number) => emit('update:limit', val),
})

function handleSizeChange(val: number) {
  if (currentPage.value * val > props.total) {
    currentPage.value = 1
  }
  emit('pagination', { page: currentPage.value, limit: val })
  if (props.autoScroll) scrollTo(0, 800)
}

function handleCurrentChange(val: number) {
  emit('pagination', { page: val, limit: pageSize.value })
  if (props.autoScroll) scrollTo(0, 800)
}
</script>

<style scoped>
.pagination-container {
  background: #fff;
}
.pagination-container.hidden {
  display: none;
}
</style>
