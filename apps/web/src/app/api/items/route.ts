import { pogettoItemSchema } from '@/schema'
import { turso } from '@/lib/turso'
import { getMetadata } from '@/lib/defuddle'
import { LibsqlError } from '@libsql/client'
import { z } from 'zod/v4'

export async function GET() {
  const result = await turso.execute('SELECT * FROM pogetto_items')

  return Response.json(result.rows)
}

export async function POST(request: Request) {
  const authorization = request.headers.get('Authorization')

  if (!authorization) {
    return new Response(null, {
      status: 401,
    })
  }

  const body = await request.json()
  const bodyParseResult = pogettoItemSchema
    .pick({
      url: true,
      title: true,
      description: true,
    })
    .safeParse(body)

  if (bodyParseResult.error) {
    const pretty = z.prettifyError(bodyParseResult.error)

    return new Response(pretty, {
      status: 400,
    })
  }

  const bodyData = bodyParseResult.data
  const metadata = await getMetadata({ url: bodyData.url })

  try {
    await turso.execute(
      'INSERT INTO pogetto_items (user_id, url, title, description, word_count, domain, favicon, image, published) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        authorization,
        bodyData.url,
        bodyData?.title ?? metadata.title,
        bodyData?.description ?? metadata.description,
        metadata.wordCount ?? 0,
        metadata.domain,
        metadata.favicon,
        metadata.image,
        metadata.published,
      ]
    )
  } catch (error: unknown) {
    const e = error instanceof LibsqlError ? error.message : null

    return new Response(e, {
      status: 500,
    })
  }

  return new Response(null, {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  })
}
