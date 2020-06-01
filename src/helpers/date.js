import format from 'date-fns/format';
import  isSameDay from 'date-fns/isSameDay'
import  isPast from 'date-fns/isPast'
import isSameMonth from 'date-fns/isSameMonth'
import isSameYear from 'date-fns/isSameYear'
import formatISO from 'date-fns/formatISO'
import parseISO from 'date-fns/parseISO'
import parse from 'date-fns/parse'
import formatDistance from 'date-fns/formatDistance'
// import distanceInWordsStrict from 'date-fns/distanceInWords'
import differenceInHours from 'date-fns/differenceInHours'


export function formatDate(value) {
    if (!value) return '';

    return format(parseISO(value), 'MMM dd, hh:mm a')
}

export function formatDateShort(value) {
    let dateFormat = 'MMM dd';

    if (!value) return format(new Date(), dateFormat);

    return format(parseISO(value), dateFormat)
}

export const now = () => Date.now();

export const timestamp = () => +Date.now();

export function formatCalendarDate(value) {
    if (!value) value = new Date();
    return format(parseISO(value), 'MMM, dd, yyyy, hh:mm a');
}

export function isPastDate(value) {
    return isPast(parseISO(value))
}

export function isToday(value) {
    return isSameDay(parseISO(value), new Date())
}

export function formatDistanceDate(date) {
    if (!date) date = new Date();
    return formatDistance(parseISO(date), new Date(),  { addSuffix: true })
}

export function dateRangeAsString(ends_at, starts_at = now()) {

    starts_at = formatISO(parse(starts_at));
    ends_at = formatISO(parse(ends_at));

    return starts_at;

    if (isSameDay(ends_at, starts_at))
        return format(starts_at, 'Do MMM yyyy');

    if (!isSameMonth(ends_at, starts_at))
        return format(starts_at, 'Do MMM') + ' - ' + format(ends_at, 'Do MMM yyyy');

    if (!isSameYear(ends_at, starts_at))
        return format(starts_at, 'Do MMM yyyy') + ' - ' + format(ends_at, 'Do MMM yyyy');

    return format(starts_at, 'Do') + ' - ' + format(ends_at, 'Do MMM yyyy');
}

export function formatDatatableDate(value) {
    if (!value) value = new Date();
    return format(parseISO(value), 'MMM dd, yyyy')
}

export function getRelativeTime(date) {
    const parsedIntDate = parseInt(date, 10);

    if (!isSameYear(Date.now(), parsedIntDate)) {
        return format(parsedIntDate, 'D MMM YYYY');
    } else if (Math.abs(differenceInHours(Date.now(), parsedIntDate)) > 23) {
        return format(parsedIntDate, 'MMM D');
    } else {
        // return distanceInWordsStrict(Date.now(), parsedIntDate)
        //     .replace(' seconds', 's')
        //     .replace(' minutes', 'm')
        //     .replace(' hours', 'h');
    }
}

export const getTime = (date) => format(parseInt(date, 10), 'H:mm A - D MMM YYYY');
