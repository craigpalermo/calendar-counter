<template>
  <div id="app">
    <calendar-month number="5"></calendar-month>
  </div>
</template>

<script>
import CalendarMonth from './components/CalendarMonth';

export default {
  name: 'app',
  components: {
    CalendarMonth,
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
