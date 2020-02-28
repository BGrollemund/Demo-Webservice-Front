export default class RNUtils {
    static properTime( timeFromApi ) {
        let
            arrResult = timeFromApi.split(':'),
            result = '';

        if( parseInt(arrResult[0]) !== 0 ) result += parseInt(arrResult[0]) + 'h';
        if( parseInt(arrResult[1]) !== 0 ) result += parseInt(arrResult[1]) + 'min';

        return result;
    };
}



