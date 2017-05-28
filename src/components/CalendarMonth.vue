<template>
  <div class="month">
    <!-- month body -->
    <div>
      <!-- month name -->
      <h1 class="month-name">{{ monthName }}</h1>

      <!-- calendar -->
      <div class="calendar">
        <!-- weekday column headers (x-axis) -->
        <div class="weekday-labels flex-row">
          <div v-for="day in weekdays">{{ day }}</div>
        </div>

        <div class="calendar-body">
          <!-- week numbers (y-axis) -->
          <div class="week-numbers flex-col">
            <div class="week-number" v-for="num in numWeeks">
              <div>{{ num }}</div>
            </div>
          </div>

          <!-- days of month -->
          <div class="days-container flex-row">
            <div class="day"
                 v-for="(day, idx) in days">
              <div v-show="day.active">
                <calendar-day :index="idx"
                              :date="day.date"
                              :value="day.value"
                              v-on:valueChanged="updateSum"></calendar-day>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- footer -->
    <div class="month-footer">
      <div class="month-total">
        Total: {{ sum }}
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  import CalendarDay from './CalendarDay';

  export default {
    name: 'calendar-month',
    props: ['month', 'year'],
    components: {
      CalendarDay,
    },
    data() {
      return {
        weekdays: ['Su', 'Mo', 'Tu', 'Wd', 'Th', 'Fr', 'Sa'],
      };
    },
    methods: {
      /**
       * Returns an array of objects of length num. Each entry has a value of 0,
       * and active set to given active value. Each day has date property that represents
       * the number of that day in the current month.
       * @param num
       * @param active
       * @returns {Array}
       */
      initValuesArray(num, active) {
        let i = 0;
        const values = [];
        while (i < num) {
          const day = {
            active,
            value: 0,
          };

          if (active) {
            day.date = i + 1;
          }

          values.push(day);
          i += 1;
        }
        return values;
      },
      /**
       * Returns array of objects used to render the calendar month. Days before/after
       * the current month have active set to false so their inputs can be hidden. If values
       * for this month exist already in vuex store, initialize corresponding dates to
       * those values, otherwise set to undefined.
       * @param number
       * @param year
       * @returns {[*,*,*]}
       */
      getValuesArray(number, year) {
        // Compute values used to initialize arrays of dates to display
        const firstOfMonth = moment(new Date(year, number - 1)).date(1);
        const daysInMonth = firstOfMonth.daysInMonth();
        const firstWeekdayOffset = firstOfMonth.isoWeekday();

        // Placeholder days for end of previous month
        const lastMonth = this.initValuesArray(firstWeekdayOffset, false);

        // Active values, one for each day of month
        const thisMonth = this.initValuesArray(daysInMonth, true);

        // Placeholder days for start of next month
        const remainingDays = (((lastMonth.length + thisMonth.length) % 7) + 1);
        const nextMonth = this.initValuesArray(remainingDays, false);

        // Create array of calendar days
        let calendarDays = [...lastMonth, ...thisMonth, ...nextMonth];

        // Add values from store to each calendar day
        const values = this.$store.getters.years[this.year][this.month - 1];
        calendarDays = calendarDays.map((d, index) => {
          const day = d;
          day.value = values[index];
          return day;
        });

        return calendarDays;
      },
      updateSum(data) {
        // Update value in array
        this.days[data.index].value = data.value;

        // Update values for this month in store
        this.$emit('updateMonth', {
          year: this.year,
          month: this.month,
          values: this.days.map(x => x.value),
        });
      },
    },
    computed: {
      monthName() {
        return moment(new Date(this.year, this.month - 1)).format('MMMM');
      },
      numWeeks() {
        return Math.floor(this.days.length / 7);
      },
      sum() {
        return this.days.reduce((total, day) => total + (day.value || 0), 0);
      },
      days() {
        return this.getValuesArray(this.month, this.year);
      },
    },
  };
</script>

<style scoped lang="scss">
  $week-num-width: 15px;

  .month {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 20px;
    width: 330px;
  }

  .month-name {
    font-size: 2em;
  }

  .calendar-body {
    display: flex;
    flex-flow: row nowrap;
  }

  .week-numbers {
    justify-content: space-between;

    .week-number {
      align-items: center;
      display: flex;
      flex-flow: row nowrap;
      height: 100%;
      width: $week-num-width;
    }
  }

  .weekday-labels {
    margin-left: $week-num-width;
  }

  .weekday-labels > *,
  .day {
    width: (1 / 7) * 100%;
  }

  .weekday-labels > *,
  .month-total,
  .month-name,
  .week-number {
    text-align: center;
  }

  .month-total {
    font-size: 1.3em;
    font-weight: 600;
  }
</style>
