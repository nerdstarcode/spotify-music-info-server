import { FastifyInstance } from "fastify";
import axios from 'axios'
import { prisma } from "../../lib/prisma";
import { SpotifyService } from "./services/spotify.service";
const service = new SpotifyService()

export async function spotifyRoutes(app: FastifyInstance) {
  app.get('/topTracks', async (request: any, response) => {
    return await service.getTopTraks(request)
  });
}