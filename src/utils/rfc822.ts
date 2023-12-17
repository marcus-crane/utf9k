import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import advancedFormat from "dayjs/plugin/advancedFormat"

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(advancedFormat)

const RFC822_DATE_FORMAT = 'ddd, DD MMM YYYY HH:mm:ss [GMT]'

// Format date as RFC822 format, primarily for RSS feeds
// TODO: Make this more robust but it works for now
export const dateToRfc822 = function(date: Date): string {
    return dayjs(date).tz("Etc/GMT").format(RFC822_DATE_FORMAT)
}