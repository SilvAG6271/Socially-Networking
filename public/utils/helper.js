//function to format timestamp
function formatTimeStamp(timestamp) {
    const formattedDate = 
    `${timestamp.getFullYear()}-${(timestamp.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${timestamp
        .getDate()
        .toString()
        .padStart(2, '0')}-${timestamp
        .getHours()
        .toString()
        .padStart(2, '0')}-${timestamp
        .getMinutes()
        .toString()
        .padStart(2, '0')}-${timestamp
        .getSeconds()
        .toString()
        .padStart(2, '0')}`;

        return formattedDate;
}

        module.exports = {formatTimeStamp,};
