import fastify from 'fastify';
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import 'dotenv/config'
import { authRoutes } from './routes/auth';
import { resolve } from 'node:path';

const app = fastify();


app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})

app.register(multipart)
app.register(cors, {
    origin: true, //todas as urls de front podem acessar o backend,
    // origin: ['http://localhost:3333', 'dev', 'qa', 'prod]
})
app.register(jwt, {
    secret: 'spacetime',
})

app.register(authRoutes)

app.listen({
    port: 3333,
    // host: '0.0.0.0',
}).then(() => {
    console.log('🚀 HTTP server running on http://localhost:3333 🚀')
});