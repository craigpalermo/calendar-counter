<template>
  <div class="calendar-year">
    <!-- year number -->
    <h1 class="year">
      {{ year }}
      <span class="text-muted">({{ sum }})</span>
    </h1>

    <!-- months -->
    <div class="months-container">
      <calendar-month v-for="month in 12"
                      v-on:monthSumChanged="updateSum"
                      :year="year"
                      :month="month"
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
    data() {
      return {
        monthSums: Array(12).fill(0),
        sum: 0,
      };
    },
    methods: {
      updateSum(data) {
        // Update month's value
        this.monthSums[data.month - 1] = data.value;

        // Recompute sum for year
        this.sum = this.monthSums.reduce((total, val) => total + val, 0);
      },
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
