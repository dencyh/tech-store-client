import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
  firstName: string().min(1, "Обязательное поле"),
  lastName: string().min(1, "Обязательное поле"),
  password: string().min(6, "Пароль должен содержать минимум 6 символов"),
  passwordConfirmation: string().min(1, "Обязательное поле"),
  email: string()
    .min(1, "Обязательное поле")
    .email("Некорректный адрес эл. почты")
}).refine((date) => date.password === date.passwordConfirmation, {
  message: "Пароли должны совпадать",
  path: ["passwordConfirmation"]
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;

export const loginSchema = object({
  email: string()
    .min(1, "Обязательное поле")
    .email("Некорректный адрес эл. почты"),
  password: string().min(1, "Обязательное поле")
});

export type LoginInput = TypeOf<typeof loginSchema>;

export const updateUserSchema = object({
  firstName: string().min(1, "Обязательное поле").optional(),
  lastName: string().min(1, "Обязательное поле").optional(),
  password: string()
    .min(6, "Пароль должен содержать минимум 6 символов")
    .optional(),
  email: string()
    .min(1, "Обязательное поле")
    .email("Некорректный адрес эл. почты")
    .optional()
});
