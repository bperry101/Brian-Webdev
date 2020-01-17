var today;
var dateArr =  [];

var changeDate = () => {
    today = new Date();
    today.setHours(0,0,0,0);
    today.setDate(today.getDate() + 1);
    dateArr.push(today.getTime());
    for (var i = 0; i < 3; i++) {
        dateArr.push(today.setDate(today.getDate() - 1));
    }
    return dateArr
};

export default changeDate;