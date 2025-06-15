const data = await fetch('https://cloud.umami.is/script.js')
    .then(response => response.text())

export function GET() {
    return new Response(data)
}