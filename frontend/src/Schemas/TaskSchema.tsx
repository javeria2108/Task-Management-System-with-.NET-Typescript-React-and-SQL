import { z } from "zod";

export const TaskSchema = z.object({
  name: z.string().min(1, { message: "Please provide a task name" }),
  description: z.string().min(1, { message: "Please provide a description" }),
  priority: z.string().min(1, { message: "Please select a priority" }),
  category: z.string().min(1, { message: "Please select a category" }),
  duedate: z.date(),
  username: z.string().min(1, { message: "Please provide a username" }), // Add the username field
});

export type taskSchema = z.infer<typeof TaskSchema>;
