<template>
  <div class="month">
    <h1>{{ monthName }}</h1>

    <div class="days-container">
      <div class="day"
           v-for="day in days">
        <div>
          <div type="number" v-if="day.active">{{ day.value }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';

  export default {
    name: 'calendar-month',
    props: ['number'],
    data() {
      return {
        days: this.getValuesArray(this.number),
      };
    },
    methods: {
      getValuesArray(number) {
        const firstOfMonth = moment(new Date(moment().year(), number - 1)).date(1);
        const daysInMonth = firstOfMonth.daysInMonth();
        const firstWeekdayOffset = firstOfMonth.isoWeekday();

        // Placeholder values for end of previous month
        const inactiveValues = new Array(firstWeekdayOffset).fill({
          active: false,
        });

        // Active values, one for each day of month
        const activeValues = new Array(daysInMonth).fill({
          active: true,
          value: 0,
        });
        return [...inactiveValues, ...activeValues];
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
</style>
