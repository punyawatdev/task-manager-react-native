import dayjs from 'dayjs'

export function convertDateToStringFormat(date: Date, template = 'DD/MM/YYYY'): string {
    if (date) {
        return dayjs(date).format(template)
    }
    return date
}
