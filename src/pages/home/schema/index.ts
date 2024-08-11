import { z } from 'zod';

export const treeFormSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'Name is required',
    })
    .max(10, {
      message: 'Max character is ten',
    }),
});
