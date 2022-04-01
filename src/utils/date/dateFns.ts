import { formatDistance } from "date-fns";
import { ru } from 'date-fns/locale';

export const status = (dateTime: string, message = false) => {
    const diff = Date.now() - new Date(dateTime).getTime()
    if (diff < 60000) {
        if (message) {
            return 'только что'
        }
        return 'онлайн'
    }
    return formatDistance(new Date(dateTime).getTime(), Date.now(), { addSuffix: true, locale: ru });
}