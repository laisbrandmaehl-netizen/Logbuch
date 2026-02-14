const DateUtils = {
    getMonday: (d) => {
        d = new Date(d);
        let day = d.getDay();
        let diff = d.getDate() - day + (day == 0 ? -6 : 1);
        return new Date(d.setDate(diff));
    },
    formatKey: (d) => d.toISOString().split('T')[0],
    isToday: (d) => new Date().toDateString() === d.toDateString()
};
