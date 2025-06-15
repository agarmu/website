const data = await fetch('https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css')
    .then(response => response.text())

export function GET() {
    return new Response(data)
}