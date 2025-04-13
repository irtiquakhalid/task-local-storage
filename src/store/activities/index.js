const state = {
  activities: [],
};

const mutations = {
  ADD_ACTIVITY(state, activity) {
    state.activities.push(activity);
  },
  TOGGLE_ACTIVITY(state, id) {
    const activity = state.activities.find((a) => a.id === id);
    if (activity) activity.completed = !activity.completed;
  },
  DELETE_ACTIVITY(state, id) {
    state.activities = state.activities.filter((a) => a.id !== id);
  },
  SET_ACTIVITIES(state, activities) {
    state.activities = activities;
  },
};

const actions = {
  loadActivities({ commit }) {
    const saved = JSON.parse(localStorage.getItem("activities")) || [];
    commit("SET_ACTIVITIES", saved);
  },
  addActivity({ commit, state }, text) {
    const newActivity = {
      id: Date.now(),
      text,
      completed: false,
      timestamp: new Date().toLocaleDateString(),
    };
    commit("ADD_ACTIVITY", newActivity);
    localStorage.setItem("activities", JSON.stringify(state.activities));
  },
  toggleActivity({ commit, state }, id) {
    commit("TOGGLE_ACTIVITY", id);
    localStorage.setItem("activities", JSON.stringify(state.activities));
  },
  deleteActivity({ commit, state }, id) {
    commit("DELETE_ACTIVITY", id);
    localStorage.setItem("activities", JSON.stringify(state.activities));
  },
};

const getters = {
  allActivities: (state) => state.activities,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
