import { z } from "zod";

export const LoginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const SetupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phone: z.string().optional(),
});

export const ContactSchema = z.object({
  firstName: z.string().min(2, "First name is too short").max(50),
  lastName: z.string().min(2, "Last name is too short").max(50),
  email: z.email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message is too short").max(2000),
});

export type ContactFormData = z.infer<typeof ContactSchema>;

export const CategorySchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(60, "Name is too long"),
  title: z.string().max(100, "Title is too long").optional(),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .max(60, "Slug is too long")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase letters, numbers, and hyphens only",
    ),
  description: z.string().max(500, "Description is too long").optional(),
  icon: z.string().optional(),
  image: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  status: z.enum(["draft", "published"]).default("draft"),
});

export type CategoryFormData = z.infer<typeof CategorySchema>;

export const FaqTopicSchema = z.object({
  title_en: z
    .string()
    .min(2, "Title (EN) must be at least 2 characters")
    .max(100),
  title_de: z
    .string()
    .min(2, "Title (DE) must be at least 2 characters")
    .max(100),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .max(60, "Slug is too long")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format"),
  icon: z.string().optional(),
  order: z.number().int().default(0),
});

export const FaqItemSchema = z.object({
  topicId: z.string().min(1, "Topic ID is required"),
  question_en: z.string().min(5, "Question (EN) is too short"),
  question_de: z.string().min(5, "Question (DE) is too short"),
  answer_en: z.string().min(10, "Answer (EN) is too short"),
  answer_de: z.string().min(10, "Answer (DE) is too short"),
  order: z.number().int().default(0),
});
