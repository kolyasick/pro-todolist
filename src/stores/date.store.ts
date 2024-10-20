import { defineStore } from "pinia";
import type { IDayItem, ITask } from "@/date.interface";
import { supabase } from "@/utils/supabase";
import { useAuthStore } from "./auth.store";
import { v4 as uuidv4 } from "uuid";

export const useDateStore = defineStore("date", {
  state: () => ({
    days: [] as IDayItem[],
    today: new Date(),
    tasks: [] as ITask[],
    isLoading: false,
  }),
  actions: {
    getDays(limit: number) {
      const days = [] as IDayItem[];

      for (let i = 0; i < limit; i++) {
        const tempDate = new Date(this.today);
        tempDate.setDate(tempDate.getDate() + i);
        days.push({
          date: tempDate,
        });
      }

      return days;
    },
    async addTask(title: string, description: string, date: Date) {
      const id = uuidv4();

      this.tasks.push({
        id: id,
        title: title,
        description: description,
        date: date,
        is_done: false,
        created_at: new Date(),
      });

      const { data, error } = await supabase.from("task").insert({
        id: id,
        title: title,
        description: description,
        date: date,
        user_id: useAuthStore().user?.id,
      });

      if (error) {
        console.log(error);
      }
    },

    async getTasks() {
      this.isLoading = true;
      const { data, error } = await supabase
        .from("task")
        .select("*")
        .eq("user_id", useAuthStore().user?.id)
        .eq("is_done", false);
      if (error) {
        console.log(error);
      } else {
        this.tasks = data;
      }

      this.isLoading = false;
    },

    async updateTask(task: ITask) {
      this.tasks = this.tasks.filter((t) => t.id !== task.id);

      const { data, error } = await supabase
        .from("task")
        .update({ is_done: true })
        .eq("id", task.id);
      if (error) {
        console.log(error);
      }
    },
  },
});
