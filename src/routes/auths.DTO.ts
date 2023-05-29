import { z } from "zod";

export const SpotifyAuthSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
  refresh_token: z.string(),
  scope: z.string()
})

export type SpotifyAuthDTO = z.infer<typeof SpotifyAuthSchema>

export const UserSchema = z.object({
  display_name: z.string(),
  external_urls: z.object({
    spotify: z.string().url()
  }),
  href: z.string(),
  id: z.string(),
  images: z.array(z.object({
    url: z.string().url()
  })),
  uri: z.string()
});

export type UserDTO = z.infer<typeof UserSchema>