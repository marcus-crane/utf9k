import { getCollection } from "astro:content";

const questions = await getCollection("questions");

export async function GET() {
    const index = questions.map(q => {
        return ({
            content: q.body,
            slug: q.slug,
            tags: q.data.tags,
            title: q.data.title
        })
    })
    return new Response(
        JSON.stringify(index)
    )
}