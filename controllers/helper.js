module.exports = {
    
    formatTime(time) {
        var date = new Date(Number(time));
        
        var year = date.getFullYear();
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var day = ("0" + date.getDate()).slice(-2);
        var hour = ("0" + date.getHours()).slice(-2);
        var minute = ("0" + date.getMinutes()).slice(-2);

        return `${hour}:${minute} ${day}/${month}/${year}`;
    }

}