import moment from "moment"

class DateTimeRepository{
    static date_format = 'DD-MM-YYYY HH:mm'
    static time_format = 'HH:mm'
    static month_format = 'MM-YYYY'

    static getCurrentTime(){
        return moment().format(this.time_format)
    }

    static getCurrentDate(){
        return moment().format(this.date_format)
    }

    static getCurrentMonth(){
        return moment().format(this.month_format)
    }

    static increaseTimeByHours({ current_time, hours }) {
        return moment(current_time, this.date_format).add(hours, 'hours').format(this.date_format)
    }

    static checkIsBetween({ current_time, start_time, end_time }) {
        return moment(current_time, this.date_format).isBetween(start_time, end_time)
    }
}

export default DateTimeRepository