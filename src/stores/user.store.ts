import router from "@/router";
import { supabase } from "@/utils/supabase";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "@/utils/validationUtils";
import type { AuthResponse, User, UserResponse } from "@supabase/supabase-js";
import { defineStore } from "pinia";
import { useDateStore } from "./date.store";
import type { ITask } from "@/types/date.type";
import { v4 as uuidv4 } from "uuid";

interface IErrors {
  email: string | null;
  password: string | null;
  name: string | null;
  other: string | null;
}

interface IUser extends User {
  tasks?: ITask[];
}

export const useUserStore = defineStore("auth", {
  state: () => ({
    user: null as IUser | null,
    status: false as boolean,
    errors: {} as IErrors,
    isLoading: false as boolean,
  }),
  actions: {
    set(status: boolean, user: User | null) {
      this.$patch({
        status,
        user,
      });
    },
    clearErrors() {
      this.$patch({
        errors: { email: null, password: null, name: null, other: null },
      });
    },
    async register(email: string, password: string, name: string) {
      this.errors.name = validateName(name);
      this.errors.email = validateEmail(email);
      this.errors.password = validatePassword(password);

      if (this.errors.name || this.errors.email || this.errors.password) {
        return;
      }

      try {
        this.clearErrors();
        this.isLoading = true;

        const { data, error }: AuthResponse = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username: name,
            },
          },
        });

        if (error) {
          this.errors.other = error.message;
          return;
        }

        this.set(true, data.user);
        return router.push("/");
      } catch (error: any) {
        this.errors.other = error.message;
      } finally {
        this.isLoading = false;
      }
    },
    async login(email: string, password: string) {
      this.errors.email = validateEmail(email);
      this.errors.password = validatePassword(password);

      if (this.errors.name || this.errors.email || this.errors.password) {
        return;
      }

      try {
        this.clearErrors();
        this.isLoading = true;

        const { data, error }: AuthResponse =
          await supabase.auth.signInWithPassword({
            email,
            password,
          });

        if (error) {
          this.errors.other = error.message;
          return;
        }

        this.set(true, data.user);
        await this.getUser();
        return router.push("/upcoming");
      } catch (error: any) {
        this.errors.other = "Unexpected error";
      } finally {
        this.isLoading = false;
      }
    },
    async logout() {
      try {
        await supabase.auth.signOut();

        this.set(false, null);
        return router.push("/auth");
      } catch (error) {
        console.log(error);
      }
    },
    async getUser() {
      try {
        this.isLoading = true;
        this.clearErrors();

        const { data, error }: UserResponse = await supabase.auth.getUser();

        if (error) return;
        const { data: tasks } = await supabase
          .from("task")
          .select("*")
          .eq("is_done", false)
          .eq("user_id", data.user.id);

        const userData = {
          ...data.user,
          tasks: tasks as ITask[] | [],
        };

        this.set(true, userData);
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },

    async addTask(title: string, description: string, date: Date) {
      const id = uuidv4();

      if (this.user?.tasks) {
        this.user.tasks.push({
          id: id,
          title: title,
          description: description,
          date: date,
          is_done: false,
          created_at: new Date(),
        });
      }

      const { data, error } = await supabase.from("task").insert({
        id: id,
        title: title,
        description: description,
        date:
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getDate(),
        user_id: useUserStore().user?.id,
      });

      if (error) {
        console.log(error);
      }
    },

    async updateTask(task: ITask) {
      if (!this.user) return;

      this.user.tasks = this.user.tasks?.filter((t) => t.id !== task.id);

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
