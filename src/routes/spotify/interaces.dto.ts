import { z } from "zod";

export const TopTracksReponseSchema = z.object({
  items: z.array(
    z.object({
      album: z.object({
        artists: z.array(
          z.object({ 
            external_urls: z.object({
              spotify: z.string().url(),
            }),
            name: z.string()
          })
        ),
        external_urls: z.object({
          spotify: z.string().url(),
        }),
        images: z.array(z.object({
          height: z.number(),
          url: z.string().url(),
          width: z.number()
        })),
        name: z.string(),
      }),
      artists: z.array(
        z.object({
          external_urls: z.object({
              spotify: z.string().url(),
          }),
          href: z.string().url(),
          name: z.string(),
          type: z.string(),
        })
      ),
      href: z.string().url(),
      name: z.string(),
      popularity: z.number(),
    })
  ),
  total: z.number(),
  limit: z.number(),
  offset: z.number(),
  href: z.string().url(),
  previous: (z.string().url()).or(z.null()),
  next: (z.string().url()).or(z.null())
})
export type TopTracksReponseDTO = z.infer<typeof TopTracksReponseSchema>