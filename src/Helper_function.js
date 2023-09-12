import { ImBlog } from 'react-icons/im'
import { MdVideoLibrary } from 'react-icons/md'
import { VscPerson } from 'react-icons/vsc'



export const assistMates = "am-012f"
export const assistMatesUserCookieKey = "am12p__f1"
export const jsonSecretToken = "jsst-41x"
export const __PRIVATE_KEY = 'am-pti42';


export const __LANGUAGES = [{
    flag: "US",
    lang: "EN",
    name: "English"
}, {
    flag: "FR",
    lang: "FR",
    name: "French"
}, {
    flag: "CN",
    lang: "CN",
    name: "Chinese"
}, {
    flag: "GR",
    lang: "GR",
    name: "German"
}, {
    flag: "ID",
    lang: "IN",
    name: "Indonesia"
}, {
    flag: "JP",
    lang: "JP",
    name: "Japanese"
}, {
    flag: "PR",
    lang: "PR",
    name: "Portuguese"
}, {
    flag: "RU",
    lang: "RU",
    name: "Russia"
}, {
    flag: "ES",
    lang: "ES",
    name: "Spanish"
}]

export const __SHORTCUTS = [{
    title: "Create blog",
    route: "/create-blog",
    icon: <ImBlog />
}, {
    title: "Upload Video",
    route: "/create-video",
    icon: <MdVideoLibrary />
}, {
    title: "Setting",
    route: "/prefrences",
    icon: <VscPerson />
}]

export function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
export function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
export function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = src
        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })
}
export function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
export function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
export function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
export function LowToHigh(a, b) {
    if (parseFloat(a.price) < parseFloat(b.price)) {
        return -1;
    }
    if (parseFloat(a.price) > parseFloat(b.price)) {
        return 1;
    }
    return 0;
}
export function HighToLow(a, b) {
    if (parseFloat(a.price) < parseFloat(b.price)) {
        return 1;
    }
    if (parseFloat(a.price) > parseFloat(b.price)) {
        return -1;
    }
    return 0;
}
export function nFormatter(num, digits) {
    var si = [
        { value: 1, symbol: "" },
        { value: 1E3, symbol: "k" },
        { value: 1E6, symbol: "M" },
        { value: 1E9, symbol: "G" },
        { value: 1E12, symbol: "T" },
        { value: 1E15, symbol: "P" },
        { value: 1E18, symbol: "E" }
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
            break;
        }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

export function calculateStats(list) {
    return new Promise((resolve, reject) => {
        try {
            let totalViews = 0;
            let totalWatches = 0;
            let totalTime = 0;
            let uniqueUserObject = {};
            const arrayForGraphs = list.map(item => {
                totalViews += Object.keys(item?.usersObj).length;
                let tempTotalTime = 0;
                uniqueUserObject = { ...uniqueUserObject, ...item?.usersObj };
                Object.keys(item?.usersObj).forEach(ipAddress => {
                    tempTotalTime += item?.usersObj[ipAddress];
                    if (item?.usersObj[ipAddress] > 120) {
                        totalWatches += 1;
                    }
                })
                totalTime += tempTotalTime;
                return {
                    "day": item.day,
                    "users": Object.keys(item?.usersObj).length,
                    "time": tempTotalTime
                }
            });
            resolve({
                views: totalViews,
                spent: (totalTime / 3600),
                watches: totalWatches,
                users: Object.keys(uniqueUserObject).length,
                arrayForGraphs: arrayForGraphs
            })
        } catch (error) {
            reject(error);
        }
    })
}

export const calculateGraphStats = (list) => {
    return new Promise((resolve, reject) => {
        try {
            const tempUniqueDays = [];
            const finalStatsList = [];
            list.forEach((item, index) => {
                if (!tempUniqueDays.find(e => e == item.day)) {
                    tempUniqueDays.push(item.day);
                    finalStatsList.push(list
                        .filter(e => e.day === item.day)
                        .reduce((a, b) => ({
                            day: item.day,
                            users: a.users + b.users,
                            time: a.time + b.time
                        })))
                }
            });
            resolve(finalStatsList);
        } catch (error) {
            reject(error)
        }
    })
}

export function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}