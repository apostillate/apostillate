module.exports = {
    queryHolders: length => {
        let str = "";
        for (var i = 1; i <= length - 1; i++) {
            str += "$" + i + ","
        }
        str += "$" + length;
        return str;
    },
    queryKeys: keysArray => {
        return `"${keysArray.join('","')}"`;
    }
}