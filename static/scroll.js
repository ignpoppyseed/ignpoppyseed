var scroll_time = 0;
var pages = []
var arrow_button_up = false
const page_delay = 0.5 // in seconds

for (var x of document.getElementsByClassName('section')) {
    pages.push(`#${x.id}`);
}

document.addEventListener('DOMContentLoaded', function() {
    if (window.location.hash) {
        var c_section = document.querySelector(window.location.hash);
        if (c_section) {
            sts(c_section);
        }
    }
    else {
        window.location.hash = '#'+'home'
        c_section = document.querySelector(window.location.hash)
        sts(c_section);
    }

    if (gcs() == pages.length-1) {
        document.getElementById('down_arrow').style.transform = 'rotate(180deg)'
        arrow_button_up = true
    }

    document.addEventListener('wheel', function(event) {
        if ((Date.now()/1000-scroll_time)>page_delay) {
            scroll_time = Date.now()/1000;
            sts(gns(event.deltaY))
        }
    });
});

function gcs() {
    return pages.indexOf(`${window.location.hash}`)
}

function button_handler() {
    if (arrow_button_up) {
        sts(document.getElementById(pages[0].replace('#', '')))
        arrow_button_up = false
        document.getElementById('down_arrow').style.transform = 'rotate(0deg)'
    } else {
        sts(gns(1))
    }
}

function gns(d) {
    i = pages.indexOf(`${window.location.hash}`)
    if (d>0) { // page goes down
        if (i+2 >= pages.length) {
            document.getElementById('down_arrow').style.transform = 'rotate(180deg)'
            arrow_button_up = true
        }
        if (i+1 >= pages.length) {
            return document.querySelector(`${pages[i]}`)
        } else {
            return document.querySelector(`${pages[i+1]}`)
        }
    } else if (0>d) { // page goes up
        if (i-pages.length < 0) {
            document.getElementById('down_arrow').style.transform = 'rotate(0deg)'
            arrow_button_up = false
        }
        if (i-1 >= pages.length) {
            return document.querySelector(`${pages[i]}`)
        } else {
            return document.querySelector(`${pages[i-1]}`)
        }
    }
}

function sts(section) {
    try {
        section.scrollIntoView({ behavior: 'smooth' });
        var sectionId = section.id;
        
        if (history.pushState) {
            history.pushState(null, null, '#' + sectionId);
        } else {
            window.location.hash = '#' + sectionId;
        }
        c_page = window.location.hash
    }
    catch {}
} 