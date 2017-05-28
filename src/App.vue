<template>
  <div id="app">
    <calendar-year></calendar-year>
  </div>
</template>

<script>
  import CalendarYear from './components/CalendarYear';

  export default {
    name: 'app',
    components: {
      CalendarYear,
    },
    data() {
      return {
      };
    },
  };
</script>

<style>
  .flex-row {
    display: flex;
    flex-flow: row wrap;
  }

  .flex-col {
    display: flex;
    flex-flow: column nowrap;
  }
</style>
