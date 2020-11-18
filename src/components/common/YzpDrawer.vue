<template>
  <el-drawer
    :title="title"
    :before-close="onClose"
    :visible.sync="drawVisible"
    :size="width"
    :wrapperClosable="wrapperClosable"
    append-to-body
    direction="rtl"
    custom-class="demo-drawer"
    ref="drawer"
    >
    <div class="demo-drawer__content">
      <slot></slot>
      <slot v-if="$slots.footer" name="footer"></slot>
      <div v-if="!$slots.footer" class="demo-drawer__footer">
        <el-button @click="onCancel">取 消</el-button>
        <el-button
          type="primary"
          @click="onConfirm"
          :loading="loading"
          :disabled="disabled || loading"
        >
          {{ loading ? '提交中 ...' : '确 定' }}
        </el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop({ default: '' }) title!: string
  @Prop({ default: false }) showButton!: boolean
  @Prop({ default: false }) value!: boolean
  @Prop({ default: false }) disabled!: boolean
  @Prop({ default: false }) loading!: boolean
  @Prop({ default: '30%' }) width!: string
  @Prop({ default: true }) wrapperClosable!: boolean

  drawVisible: boolean = false

  @Watch('value')
  WatchOpen(newVal: any) {
    this.drawVisible = newVal
    if (newVal) {
      this.$emit('open', true)
    } else {
      this.$emit('close', false)
    }
  }

  onClose(done: any) {
    done()
    this.$emit('input', false)
  }

  onConfirm() {
    this.$emit('confirm')
  }

  close() {
    const drawer: any = this.$refs.drawer
    drawer.closeDrawer()
  }

  onCancel() {
    this.drawVisible = false
    this.$emit('input', false)
  }

}

</script>

<style scope lang="scss"></style>