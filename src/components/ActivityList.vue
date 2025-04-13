<template>
  <v-container class="py-8">
    <v-card class="pa-6 mx-auto" max-width="1200" elevation="6">
      <v-card-title class="headline font-weight-bold mb-4"
        >My activity</v-card-title
      >

      <v-row dense>
        <v-col cols="9">
          <v-text-field
            v-model="newActivity"
            label="Add a new activity"
            @keyup.enter="addActivity"
            outlined
            dense
            hide-details
          />
        </v-col>
        <v-col cols="3" class="d-flex justify-end">
          <v-btn
            @click="addActivity"
            color="primary"
            elevation="2"
            class="text-capitalize"
          >
            Add
          </v-btn>
          <v-btn
            @click="clearAllActivities"
            color="red"
            elevation="2"
            class="text-capitalize white--text ml-2"
          >
            Clear All
          </v-btn>
        </v-col>
      </v-row>

      <v-divider class="my-4"></v-divider>
      <v-list two-line>
        <v-list-item
          v-for="activity in activities"
          :key="activity.id"
          class="activity-item px-2"
        >
          <v-list-item-action>
            <v-checkbox
              v-model="activity.completed"
              @change="toggleActivity(activity.id)"
              color="primary"
            />
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title :class="{ done: activity.completed }">
              {{ activity.text }}
            </v-list-item-title>
          </v-list-item-content>

          <div class="d-flex">
            <v-chip>{{ activity.timestamp }}</v-chip>
            <v-btn icon @click="deleteActivity(activity.id)">
              <v-icon color="red">mdi-delete</v-icon>
            </v-btn>
          </div>
        </v-list-item>

        <v-list-item v-if="activities.length === 0">
          <v-list-item-content class="text-center text--disabled">
            No activities yet. Start by adding one above.
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      newActivity: "",
    };
  },
  computed: {
    activities() {
      return this.$store.getters.allActivities;
    },
  },
  methods: {
    addActivity() {
      if (this.newActivity.trim()) {
        this.$store.dispatch("addActivity", this.newActivity);
        this.newActivity = "";
      }
    },
    toggleActivity(id) {
      this.$store.dispatch("toggleActivity", id);
    },
    deleteActivity(id) {
      this.$store.dispatch("deleteActivity", id);
    },
    clearAllActivities() {
      localStorage.removeItem("activities");
      location.reload();
    },
  },
  created() {
    this.$store.dispatch("loadActivities");
  },
};
</script>

<style lang="scss" scoped>
.activity-item {
  transition: background-color 0.2s;
  border-radius: 8px;

  &:hover {
    background-color: #f5f5f5;
  }
}
.done {
  text-decoration: line-through;
  color: #9e9e9e;
}
</style>
