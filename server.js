// This is the server that should be ran in dev instead of `vite dev`
// eg. esno server.ts

import * as process from 'node:process'
import { createServer as createViteServer } from 'vite'
import express from 'express';
import symfonyPlugin from "vite-plugin-symfony";

async function createServer() {
    const port = 13714
    const hostName = '0.0.0.0';
    const app = express()
    const vite = await createViteServer({
        plugins: [ symfonyPlugin() ],
        server: { middlewareMode: 'ssr', port: 13714 }
    })

    app.use(express.json())
    // app.use(express.urlencoded({ extended: true }))
    app.use(vite.middlewares)
    app.use('/health', (_, res) => res.send({ status: 'OK', timestamp: Date.now() }))
    app.use('/404', (_, res) => res.send({ status: 'NOT_FOUND', timestamp: Date.now() }))
    app.use('/shutdown', () => process.exit())
    app.post('/render', async (req, res) => {
        const { render } = await vite.ssrLoadModule('/assets/ssr.js')
        const response = await render(req.body)
        res.json(response)
    })

    app.listen(port || 13714, hostName || '0.0.0.0')
    console.log(`Listening to Inertia requests on port ${port || 13714}`)
}

createServer()
