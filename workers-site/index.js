import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

const STATIC_HEADERS = [
    [
        'Content-Security-Policy',
        "default-src 'none'; connect-src 'self'; font-src 'self'; img-src 'self' data:; manifest-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'",
    ],
    ['Referrer-Policy', 'strict-origin-when-cross-origin'],
    ['Strict-Transport-Security', 'max-age=63072000; includeSubdomains; preload'],
    ['X-Content-Type-Options', 'nosniff'],
    ['X-Frame-Options', 'DENY'],
    ['X-XSS-Protection', '1; mode=block'],
]

const withResponseHeaders = async (response) => {
    if (!response.ok) return response

    for (const [key, value] of STATIC_HEADERS) {
        response.headers.set(key, value)
    }

    return response
}

const getResponse = async (event) => {
    try {
        const response = await getAssetFromKV(event)
        return withResponseHeaders(response)
    } catch (error) {
        try {
            const notFoundResponse = await getAssetFromKV(event, {
                mapRequestToAsset: (req) => new Request(`${new URL(req.url).origin}/404.html`, req),
            })

            return withResponseHeaders(
                new Response(notFoundResponse.body, {
                    ...notFoundResponse,
                    status: 404,
                })
            )
        } catch {}

        return new Response(error.message || error.toString(), { status: 500 })
    }
}

addEventListener('fetch', async (event) => {
    try {
        const response = getResponse(event)
        return event.respondWith(response)
    } catch {
        event.respondWith(new Response('Internal Error', { status: 500 }))
    }
})
