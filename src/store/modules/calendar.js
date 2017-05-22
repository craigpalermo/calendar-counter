import Vue from 'vue';

/* eslint-disable no-param-reassign */
const state = {
  years: {},
};

const getters = {
  years: s => s.years,
};

const mutations = {
  addYear(s, { year, values }) {
    Vue.set(s.years, year, values);
  },
  updateMonthSum(s, { year, month, value }) {
    s.years[year].splice(month - 1, 1, value);
  },
};

export default {
  state,
  getters,
  mutations,
};
