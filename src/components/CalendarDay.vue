<template>
  <div class="day">
    <div class="date">{{ date }}</div>

    <input type="number"
           min="0"
           v-on:input="valueChanged">
  </div>
</template>

<script>
  export default {
    props: ['index', 'date'],
    name: 'calendar-day',
    methods: {
      valueChanged(event) {
        this.$emit('valueChanged', {
          index: this.index,
          value: event.target.valueAsNumber,
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .day {
    border: 1px solid #eee;
    position: relative;
    width: 100%;
  }

  input {
    background: transparent;
    border: none;
    height: 50px;
    padding: 0;
    text-align: center;
    width: 100%;
  }

  .date {
    background: #eee;
    opacity: .4;
    padding: 1px;
    position: absolute;
    top: 0;
    right: 0;
    z-index: -100;
  }
</style>
