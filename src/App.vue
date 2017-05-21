<template>
  <div id="app">
    <calendar-year :year="year"></calendar-year>
  </div>
</template>

<script>
  import moment from 'moment';

  import CalendarYear from './components/CalendarYear';

  export default {
    name: 'app',
    components: {
      CalendarYear,
    },
    data() {
      return {
        year: moment().year(),
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
