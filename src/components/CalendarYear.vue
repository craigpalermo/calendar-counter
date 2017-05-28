<template>
  <div class="calendar-year">
    <div class="year-header">
      <b-button @click="changeYear(-1)"
                :variant="'primary'">
        <icon name="arrow-left"></icon>
      </b-button>

      <!-- year number -->
      <h1 class="year">
        {{ year }}
        <span class="text-muted">({{ sum }})</span>
      </h1>

      <b-button @click="changeYear(1)"
                :variant="'primary'">
        <icon name="arrow-right"></icon>
      </b-button>
    </div>

    <!-- months -->
    <div class="months-container">
      <calendar-month v-for="month in 12"
                      v-on:updateMonth="updateSum"
                      :year="year"
                      :month="month"
                      :key="month">
      </calendar-month>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';

  import CalendarMonth from './CalendarMonth';

  export default {
    name: 'calendar-year',
    components: {
      CalendarMonth,
    },
    data() {
      return {
        year: moment().year(),
      };
    },
    methods: {
      updateSum(data) {
        this.$store.commit('updateMonth', {
          year: this.year,
          month: data.month,
          values: data.values,
        });
      },
      addYearToStore(year) {
        const values = Array(12).fill([]);

        // initialize array for this year if it DNE
        this.$store.commit('addYear', {
          year,
          values,
        });
      },
      changeYear(val) {
        this.year += val;
      },
    },
    computed: {
      sum() {
        let values = this.$store.getters.years[this.year];

        // Create new values array if not already in store
        if (!values) {
          this.addYearToStore(this.year);
          values = this.$store.getters.years[this.year];
        }

        return values.reduce((yearSum, month) => {
          // Calculate sum of month, counting undefined values as 0
          const monthSum = month.reduce((monthTotal, dayValue) => monthTotal + (dayValue || 0), 0);
          return monthSum + yearSum;
        }, 0);
      },
    },
    created() {
      const years = this.$store.getters.years;

      // Add year to store if it doesn't exist
      if (!years[this.year]) {
        this.addYearToStore(this.year);
      }
    },
  };
</script>

<style scoped lang="scss">
  .calendar-year {
    align-items: center;
    display: flex;
    flex-direction: column;
  }

  .year-header {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  h1.year {
    margin: 0 8px;
    text-align: center;
  }

  .months-container {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    max-width: (330px + 40px) * 4;
  }
</style>
