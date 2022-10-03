<template>
  <teleport to="body">
    <transition enter-active-class="transition ease-out duration-200 transform" enter-from-class="opacity-0"
      enter-to-class="opacity-100" leave-active-class="transition ease-in duration-200 transform"
      leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div ref="modal-backdrop" class="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-50" v-show="props.show">
        <div class="flex items-start justify-center min-h-screen pt-24 text-center">
          <div class="bg-white rounded-lg text-left overflow-hidden shadow-xl p-8 w-3/4 md:w-1/2 lg:w-1/3" role="dialog" ref="modal"
            aria-modal="true" aria-labelledby="modal-headline">
            <div class="modal">
              <div class="modal-header border-b-2 border-b-gray-100">
                <h1 class="text-lg text-primary-color">
                  <slot name="title"></slot>
                </h1>
              </div>
              <div class="py-2">
                <slot></slot>
              </div>
              <div class="text-right">
                <slot name="buttons"></slot>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
const props = defineProps<{show: boolean}>()
</script>