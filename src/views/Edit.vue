<template>
  <section class="bg-gray-50">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"
          >
            Edit Task
          </h1>
          <form class="space-y-4 md:space-y-6" method="post">
            <div>
              <label
                for="titile"
                class="block mb-2 text-sm font-medium text-gray-900"
                >title</label
              >
              <input
                type="text"
                name="title"
                id="title"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="name@company.com"
                v-model="form.inputs.title.value"
                required
              />
            </div>
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900"
                >priority</label
              >

              <select
                name="priority"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                v-model="form.inputs.priority.value"
                required
              >
                <option value="low" :selected="task.priority === 'low'">
                  Low
                </option>
                <option value="medium" :selected="task.priority === 'medium'">
                  Medium
                </option>
                <option value="high" :selected="task.priority === 'high'">
                  High
                </option>
              </select>
            </div>
            <button
              @click="updateTask($event)"
              class="w-full text-white hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-400"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import router from "@/router";
import Taskcard from "../components/TaskCard.vue";
import type Task from "@/types/Task";
import TaskDataService from "@/services/TaskDataService";

export default defineComponent({
  name: "Edit",
  components: {
    Taskcard,
  },
  data() {
    return {
      task: Object,
      form: {
        serverError: null,
        inputs: {
          title: {
            value: null,
            rule: "required|string",
            error: null,
          } as { [key: string]: any },
          priority: {
            value: null,
            rule: "required",
            error: null,
          } as { [key: string]: any },
        } as { [key: string]: any },
      },
    };
  },
  mounted() {
    const taskId = this.$route.params.taskId;

    this.fetchTask(taskId as string);
  },
  created() {},
  methods: {
    fetchTask(taskId: string) {
      TaskDataService.get(taskId)
        .then((response) => {
          this.task = response.data.task;

          this.form.inputs.priority.value = this.task.priority;
          this.form.inputs.title.value = this.task.title;
        })
        .catch((error) => {
          console.error("Error fetching tasks:", error);
        });
    },
    updateTask(event: any) {
      const vm = this;
      const taskId = this.$route.params.taskId;

      event.preventDefault();

      console.log(this.form.inputs);

      TaskDataService.update(
        taskId as string,
        this.form.inputs.title.value,
        this.form.inputs.priority.value
      )
        .then((response) => {
          router.push("/");
        })
        .catch((e: any) => {
          // const errors = e.response.data.errors;

          console.log(e);
        });
    },
  },
});
</script>
  <style scoped>
</style>