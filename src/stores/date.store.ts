import { defineStore } from "pinia";
import type { IDayItem, ITask } from "@/types/date.type";
import { supabase } from "@/utils/supabase";
import { useUserStore } from "./user.store";
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
  },
});
