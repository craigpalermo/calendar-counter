<template>
  <div class="month">
    <!-- month name -->
    <h1>{{ monthName }}</h1>

    <!-- calendar -->
    <div class="days-container">
      <div class="day"
           v-for="(day, idx) in days">
        <div>
          <div v-show="day.active">
            <calendar-day :index="idx" v-on:valueChanged="updateSum"></calendar-day>
          </div>
        </div>
      </div>
    </div>

    <!-- totals -->
    <div>
      {{ sum }}
    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  import CalendarDay from './CalendarDay';

  export default {
    name: 'calendar-month',
    props: ['number'],
    components: {
      CalendarDay,
    },
    data() {
      return {
        days: this.getValuesArray(this.number),
        sum: 0,
      };
    },
    methods: {
      initValuesArray(num, active) {
        let i = 0;
        const values = [];
        while (i < num) {
          values.push({
            active,
            value: 0,
          });
          i += 1;
        }
        return values;
      },
      getValuesArray(number) {
        const firstOfMonth = moment(new Date(moment().year(), number - 1)).date(1);
        const daysInMonth = firstOfMonth.daysInMonth();
        const firstWeekdayOffset = firstOfMonth.isoWeekday();

        // Placeholder values for end of previous month
        const inactiveValues = this.initValuesArray(firstWeekdayOffset, false);

        // Active values, one for each day of month
        const activeValues = this.initValuesArray(daysInMonth, true);

        return [...inactiveValues, ...activeValues];
      },
      updateSum(data) {
        this.days[data.index].value = data.value;
        this.sum = this.days.reduce((total, day) => total + day.value, 0);
      },
    },
    computed: {
      monthName() {
        const now = moment();
        return moment(new Date(now.year(), this.number - 1)).format('MMMM');
      },
    },
  };
</script>

<style scoped lang="scss">
  .month {
    width: 300px;
  }

  .days-container {
    display: flex;
    flex-flow: row wrap;
  }

  .day {
    width: (1 / 7) * 100%;
  }

  input {
    width: 100%;
  }
</style>
