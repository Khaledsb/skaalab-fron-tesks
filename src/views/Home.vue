<template>
  <main>
    <div class="justify-items-center ml-12 mt-4">
      <h1 class="text-lg">Tasks list</h1>
    </div>
    <div class="mt-5 container">
      <div class="row p-4">
        <div v-for="task in tasks" v-bind:key="task.id">
          <Taskcard :task="task" />
        </div>
      </div>
    </div>
  </main>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Taskcard from "../components/TaskCard.vue";
import type Task from "@/types/Task";
import TaskDataService from "@/services/TaskDataService";

export default defineComponent({
  name: "Home",
  components: {
    Taskcard,
  },
  data() {
    return {
      tab: 0,
      tasks: [] as Task[],
    };
  },
  mounted() {
    this.fetchTasks();
  },
  created() {},
  methods: {
    fetchTasks() {
      TaskDataService.getAll()
        .then((response) => {
          this.tasks = response.data.tasks;
        })
        .catch((error) => {
          console.error("Error fetching tasks:", error);
        });
    },
  },
});
</script>
  <style scoped>
</style>