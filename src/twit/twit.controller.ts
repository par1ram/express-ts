import { Request, Response, Router } from 'express'
import { TwitService } from './twit.service'
import { authMiddleware } from '../test.middleware'
import { createTwitDto } from './twit.dto'

const twitController = Router()

twitController.post(
	'/',
	authMiddleware,
	async (req: Request, res: Response) => {
		const validation = createTwitDto.safeParse(req.body)

		if (!validation.success) {
			return res.status(400).json({ messgae: validation.error.errors })
		}

		const twit = await TwitService.create(req.body)
		res.status(200).json(twit)
	}
)

twitController.get('/', async (req: Request, res: Response) => {
	const twits = await TwitService.getAll()
	res.json(twits)
})

export { twitController }
