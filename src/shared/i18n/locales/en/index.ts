import filter from './filter.json'
import notFound from './not-found.json'

export const en = {
	...filter,
	'not-found': notFound
} as const
