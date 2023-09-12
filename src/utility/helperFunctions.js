import MaintenanceImage from '../assets/pages/maintenance-2.png'

export const stringToHTML = function (str) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(str, 'text/html');

    if (doc.querySelector('h1')) {
        return doc.querySelector('h1').textContent;
    }
    if (doc.querySelector('h2')) {
        return doc.querySelector('h2').textContent;
    }
    if (doc.querySelector('h3')) {
        return doc.querySelector('h3').textContent;
    }
    if (doc.querySelector('h4')) {
        return doc.querySelector('h4').textContent;
    }
    if (doc.querySelector('h5')) {
        return doc.querySelector('h5').textContent;
    }
    if (doc.querySelector('p')) {
        return doc.querySelector('p').textContent;
    }

};


export const getImageUrl = (htmlString) => {
    try {
        if (htmlString.includes("<img src=")) {
            const substring = htmlString.substring(htmlString.indexOf("<img src=") + 10, htmlString.length);
            const substring2 = substring.indexOf(`"`);
            return substring.substring(0, substring2)
        } else {
            return MaintenanceImage
        }
    } catch (error) {
        return MaintenanceImage
    }
}


