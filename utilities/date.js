import moment from 'moment';

export const formatDate = function(date, format){
    if(!format){
        format = "DD-MMM-YYYY"
    }
    return moment(date).format(format);
}