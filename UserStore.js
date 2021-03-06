import { store } from '@risingstack/react-easy-state';

const userData = store({
  data: {},
  plans: {},
  clearData: function () {
    this.data = {};
  },
  calendarDate: [],
  calendarOptions: [],
  calendarHour: [],
  choosenHour: [],
  selectedPlan: {},
});

export default userData;
