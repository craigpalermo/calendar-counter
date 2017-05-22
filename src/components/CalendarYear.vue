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
      return {};
    },
    methods: {
      updateSum(data) {
        this.$store.commit('updateMonthSum', {
          year: this.year,
          month: data.month,
          value: data.value,
        });
      },
    },
    computed: {
      sum() {
        const values = this.$store.getters.years[this.year];
        return values.reduce((total, val) => total + val, 0);
      },
    },
    created() {
      const years = this.$store.getters.years;
      let values;

      if (!years[this.year]) {
        values = Array(12).fill(0);

        // initialize array for this year if it DNE
        this.$store.commit('addYear', {
          year: this.year,
          values,
        });
      } else {
        values = years[this.year];
      }

      return values;
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
