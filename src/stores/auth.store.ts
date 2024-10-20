import router from "@/router";
import { supabase } from "@/utils/supabase";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "@/utils/validationUtils";
import type { AuthResponse, User, UserResponse } from "@supabase/supabase-js";
import { defineStore } from "pinia";
interface IErrors {
  email: string | null;
  password: string | null;
  name: string | null;
  other: string | null;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    status: false as boolean,
    errors: {
      email: null,
      password: null,
      name: null,
      other: null,
    } as IErrors,
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
      if (
        !validateName(name, this.errors) ||
        !validateEmail(email, this.errors) ||
        !validatePassword(password, this.errors)
      ) {
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
      if (
        !validateEmail(email, this.errors) ||
        !validatePassword(password, this.errors)
      ) {
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
        return router.push("/");
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

        this.set(true, data.user);
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
