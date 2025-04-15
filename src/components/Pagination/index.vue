<template>
  <div :class="{ hidden }" class="pagination-container">
    <el-pagination
      :background="background"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
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
import { computed } from 'vue'
import { scrollTo } from '@/utils/scrollTo'

interface PaginationEvent {
  page: number
  limit: number
}

const props = defineProps<{
  total: number
  page?: number
  limit?: number
  pageSizes?: number[]
  pagerCount?: number
  layout?: string
  background?: boolean
  autoScroll?: boolean
  hidden?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:page', value: number): void
  (e: 'update:limit', value: number): void
  (e: 'pagination', payload: PaginationEvent): void
}>()

const currentPage = computed<number>({
  get: () => props.page ?? 1,
  set: (val: number) => emit('update:page', val),
})

const pageSize = computed<number>({
  get: () => props.limit ?? 20,
  set: (val: number) => emit('update:limit', val),
})

const pageSizes = computed(() => props.pageSizes ?? [10, 20, 30, 50])
const pagerCount = computed(() => props.pagerCount ?? (document.body.clientWidth < 992 ? 5 : 7))
const layout = computed(() => props.layout ?? 'total, sizes, prev, pager, next, jumper')
const background = computed(() => props.background ?? true)
const autoScroll = computed(() => props.autoScroll ?? true)
const hidden = computed(() => props.hidden ?? false)

function handleSizeChange(val: number) {
  if (currentPage.value * val > props.total) {
    currentPage.value = 1
  }
  emit('pagination', { page: currentPage.value, limit: val })
  if (autoScroll.value) {
    scrollTo(0, 800)
  }
}

function handleCurrentChange(val: number) {
  emit('pagination', { page: val, limit: pageSize.value })
  if (autoScroll.value) {
    scrollTo(0, 800)
  }
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
