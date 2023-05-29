import { FastifyInstance } from "fastify";
import axios from 'axios'
import { prisma } from "../lib/prisma";
import queryString from "query-string";
import { SpotifyAuthDTO, SpotifyAuthSchema, UserSchema } from "./auths.DTO";

export async function authRoutes(app: FastifyInstance) {
  app.post('/callback', async (request: any, response) => {
    var code = request.body.code || null;
    const credentials = Buffer.from(
      process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET
    );
    var authOptions = {
      method: 'POST',
      maxBodyLength: Infinity,
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (credentials.toString('base64'))
      },
      data: {
        code: code,
        client_id: process.env.CLIENT_ID,
        grant_type: 'authorization_code',
        redirect_uri: 'http://localhost:3000/api/auth/callback'
      },
    };
    const auth: SpotifyAuthDTO = await axios.request(authOptions)
      .then((response) => {
        const SafeResponse = SpotifyAuthSchema.parse(response.data)
        return SafeResponse;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://api.spotify.com/v1/me',
      headers: {
        'Authorization': 'Bearer ' + auth.access_token
      }
    };

    const userResponse = await axios.request(config)
      .catch((error) => {
        console.log(error);
      });
    const userInfo = UserSchema.parse(userResponse?.data);
    let user = await prisma.user.findUnique({
      where: {
        spotifyID: userInfo.id
      }
    })
    if (!user) {
      user = await prisma.user.create({
        data: {
          spotifyID: userInfo.id,
          display_name: userInfo.display_name,
          href: userInfo.href,
          uri: userInfo.uri,
          external_urls: { create: [userInfo.external_urls] },
          images: { create: userInfo.images.map(image => ({ url: image.url })) }
        }
      })
    }
    const [spotifyURLs, spotifyImages] = await Promise.all([
      prisma.spotifyURL.findMany({
        where: {
          userId: user.id
        }
      }),
      prisma.spotiFyImages.findMany({
        where: {
          userId: user.id
        }
      })
    ]);
    const token = app.jwt.sign({
      name: user.display_name,
      spotifyID: user.spotifyID,
      urlProfile: spotifyURLs[0].spotify,
      urlImageProfile: spotifyImages[0].url
    }, {
      sub: user.id,
      expiresIn: '1 hour'
    })
    return {
      token
    }
  });
}