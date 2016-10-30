/**
 * Created by julianmonono on 30/10/2016.
 */
export default class StringExtensions {
    static hashString(input) {
        var hash = 0;
        var i, cha;

        if (input.length === 0) return hash;

        for (i = 0; i < input.length; i++) {

            cha = input.charCodeAt(i);

            hash = ((hash<<5)-hash)+cha;

            hash &= hash; // Convert to 32bit integer
        }

        return hash.toString();
    }
}