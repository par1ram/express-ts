import express, { NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import { twitController } from './twit/twit.controller'
import { PrismaClient } from '@prisma/client'
import { logger } from './utils/log'
import helmet from 'helmet'

dotenv.config()

const app = express()
const prisma = new PrismaClient()
const PORT = process.env.PORT || 3000

async function main() {
	app.use(helmet())
	app.use(express.json())

	app.use('/api/twits', twitController)

	app.get('/error', (req, res) => {
		throw new Error('test error')
	})

	app.all('*', (req, res) => {
		res.status(404).json({ message: 'not found' })
	})

	app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
		logger.error(err.stack)
		res.status(500).send('Something went wrong')
	})

	app.listen(PORT, () => {
		logger.info(`Server started on port: ${PORT}`)
	})
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		logger.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
