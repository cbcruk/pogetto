import { z } from 'zod/v4'

export const pogettoItemSchema = z.object({
  id: z.number(),
  user_id: z.string(),
  url: z.string(),
  title: z.string().nullish(),
  description: z.string().nullish(),
  is_archived: z.number(),
  word_count: z.number().nullish(),
  added_at: z.string(),
  updated_at: z.string(),
})

export type PogettoItemSchema = z.infer<typeof pogettoItemSchema>

export const tagSchema = z.object({
  id: z.number(),
  user_id: z.string(),
  name: z.string(),
  created_at: z.string(),
})

export const pogettoItemTagSchema = z.object({
  id: z.number(),
  item_id: z.string(),
  tag_id: z.string(),
  created_at: z.string(),
})

export const noteSchema = z.object({
  id: z.number(),
  item_id: z.string(),
  content: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
})
