import { JSDOM } from 'jsdom'
import { Defuddle } from 'defuddle/node'
import { PogettoItemSchema } from '@/schema'

type GetMetadataParams = Pick<PogettoItemSchema, 'url'>

export async function getMetadata(params: GetMetadataParams) {
  const dom = await JSDOM.fromURL(params.url)
  const result = await Defuddle(dom)

  return result
}
