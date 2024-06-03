export const getApexDomain = function (url: string) {
    if (!URL.canParse(url)) {
        return url
    }
    const parsedUrl = new URL(url);
    let hostBits = parsedUrl.host.split(".");
    // Technically speaking, https://ai is a valid domain
    if (hostBits.length > 2) {
        hostBits = [
            hostBits[hostBits.length-2], // domain (no subdomains)
            hostBits[hostBits.length-1] // tld (ie; .com)
        ]
    }
    return hostBits.join('.')
}