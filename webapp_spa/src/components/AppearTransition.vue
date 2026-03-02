<template>
  <transition name="fade">
    <slot></slot>
  </transition>
</template>

<script></script>

<style>
/* fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s, max-height 0.5s;
}

.fade-enter-from {
  opacity: 0;
  max-height: 0px;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  max-height: 1000px;
}

.fade-leave-to {
  opacity: 0;
  max-height: 0px;
}
</style>
