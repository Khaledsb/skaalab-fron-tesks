<template>
  <main>
    <div class="justify-items-center ml-12 mt-4">
      <h1 class="text-lg">Task Show Page</h1>
    </div>
    <div class="mt-5 container">
      <div class="row p-4">
        <Taskcard :task="task" />
      </div>
    </div>
  </main>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Taskcard from "../components/TaskCard.vue";
import type Task from "@/types/Task";
import TaskDataService from "@/services/TaskDataService";
import echo from "../config/echo";

export default defineComponent({
  name: "Show",
  components: {
    Taskcard,
  },
  data() {
    return {
      task: Object,
    };
  },
  mounted() {
    const taskId = this.$route.params.taskId;

    this.fetchTask(taskId);

    echo.channel("notification").listen("TaskUpdate", (event) => {
      this.task = event.task;
    });
  },
  created() {},
  methods: {
    fetchTask(taskId: string) {
      TaskDataService.get(taskId)
        .then((response) => {
          this.task = response.data.task;
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