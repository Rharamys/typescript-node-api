import fetch from 'node-fetch';
import express from 'express'
import cors from 'cors'

const url: string = 'https://api.agify.io/';

interface IAPIOptions {
	method: string,
	headers?: {
		"X-RapidAPI-Key": string,
		"X-RapidAPI-Host": string
	}
}
const options: IAPIOptions = {
	method: 'GET'
  };

// Porta
const PORT = process.env.PORT || 8080
// Host
const HOSTNAME = process.env.HOSTNAME || 'http://localhost'
// App Express
const app = express()
// Endpoint
app.get('/api-call', (req, res) => {
    let { name } = req.query;
    fetch(url + '?name=' + name, options)
        .then(async (response) => res.send(await response.json()))
        .catch((err: any) => {
            console.error(err);
            res.sendStatus(500);
            res.send(err);
        });
})
// Cors
app.use(cors({
    origin: ['http://localhost:8081']
}))
// Standard response
app.use((req, res) => {
    res.status(404)
})
// Init server
export default app.listen(PORT, () => {
    console.log(`Server is running on ${HOSTNAME}:${PORT}`)
})
