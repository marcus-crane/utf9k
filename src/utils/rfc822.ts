import dayjs from "dayjs"

const RFC822_DATE_FORMAT = 'ddd, DD MMM YYYY HH:mm:ss ZZ'

// Format date as RFC822 format, primarily for RSS feeds
export const dateToRfc822 = function(date: Date): string {
    return dayjs(date).format(RFC822_DATE_FORMAT)
}