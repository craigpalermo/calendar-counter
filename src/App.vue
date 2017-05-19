<template>
  <div id="app">
    <calendar-month number="2"></calendar-month>
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
</style>
