export function url(page) {
    if (page.data.slug) {
        return `./${page.data.slug}`
    }
    return page.data.url
}