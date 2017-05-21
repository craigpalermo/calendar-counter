<template>
  <input type="number"
         min="0"
         v-on:input="valueChanged">
</template>

<script>
  export default {
    props: ['index', 'days'],
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
