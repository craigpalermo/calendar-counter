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
  updateMonth(s, { year, month, values }) {
    s.years[year].splice(month - 1, 1, values);
  },
};

export default {
  state,
  getters,
  mutations,
};
