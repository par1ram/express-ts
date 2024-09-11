import { PrismaClient, Twit } from '@prisma/client'
import { ICreateTwit } from './twit.types'
import { logger } from '../utils/log'

export class TwitService {
	private static prisma = new PrismaClient()

	static async create(twit: ICreateTwit): Promise<Twit> {
		try {
			return this.prisma.twit.create({
				data: twit,
			})
		} catch (error) {
			logger.error(error)
			throw new Error('Error while creating twit')
		}
	}

	static async getAll(): Promise<Twit[]> {
		try {
			return this.prisma.twit.findMany()
		} catch (error) {
			logger.error(error)
			throw new Error('Error while finding twits')
		}
	}
}
