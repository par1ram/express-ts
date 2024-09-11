import { TwitService } from './twit.service'

describe('TwitService', () => {
	it('Should be create a twit', async () => {
		const twit = await TwitService.create({
			text: 'Hello world',
		})

		expect(twit).toHaveProperty('id')
		expect(twit.text).toBe('Hello world')
	})
})
