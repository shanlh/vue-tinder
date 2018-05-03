<template>
  <div class="tinder-card">
    <slot></slot>
    <slot name="nope"></slot>
    <slot name="like"></slot>
    <slot name="super"></slot>
  </div>
</template>

<script>
export default {
  name: 'tinder-card'
}
</script>

<style scoped>
.tinder-card{
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #fefefe;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,.15);
}
</style>
