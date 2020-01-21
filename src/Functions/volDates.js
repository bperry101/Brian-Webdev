var today;
var volDateArr =  [];

var volDates = () => {
    today = new Date();
    today.setHours(0,0,0,0);

    volDateArr.push(today.getTime());

    var yesterday = today;

    yesterday.setDate(yesterday.getDate() - 1);
    volDateArr.push(yesterday.getTime());

    yesterday.setDate(yesterday.getDate() + 1);

    for (var i = 0; i <= 3; i++) {
        volDateArr.push(today.setDate(today.getDate() - 7));
    }
    return volDateArr
};

export default volDates;