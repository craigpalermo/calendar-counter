<template>
  <div class="calendar-year">
    <h1 class="year">{{ year }}</h1>

    <div class="months-container">
      <calendar-month :year="year"
                      :month="month"
                      v-for="month in 12"
                      :key="month">
      </calendar-month>
    </div>
  </div>
</template>

<script>
  import CalendarMonth from './CalendarMonth';

  export default {
    name: 'calendar-year',
    props: ['year'],
    components: {
      CalendarMonth,
    },
  };
</script>

<style scoped lang="scss">
  .calendar-year {
    align-items: center;
    display: flex;
    flex-direction: column;
  }

  h1.year {
    text-align: center;
  }

  .months-container {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    max-width: (330px + 40px) * 4;
  }
</style>
