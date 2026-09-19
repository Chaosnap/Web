function updateDateTime() {
    const options = { weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'America/Toronto' };
    let now = new Date().toLocaleString('en-US', options).replace(',', '');

    now = now.replace(/\b\w{3}\b/g, function(txt) {
        return txt.toUpperCase();
    });

    now = now.replace(/,/g, '');
    now = now.replace(/ (\d{2}:\d{2}) (AM|PM)/, ' $1$2');

    const el = document.getElementById('datetime');
    if (!el) return;

    const m = now.match(/(\d{2}:\d{2}(?:AM|PM))\s*$/);
    if (m) {
        const time = m[1];
        const date = now.slice(0, m.index).trim();
        el.innerHTML = '<span class="dt-date">' + date + ' </span><span class="dt-time">' + time + '</span>';
    } else {
        el.textContent = now;
    }
}

function personalizeLegacyLabels() {
    document.title = document.title
        .replace(/Oak Instituto/g, 'Yuki Instituto')
        .replace(/VSQXs\/USTs/g, 'Archive');

    document.querySelectorAll('.title').forEach(function(el) {
        el.childNodes.forEach(function(node) {
            if (node.nodeType === Node.TEXT_NODE) {
                node.nodeValue = node.nodeValue.replace(/OAK INSTITUTO/g, 'YUKI INSTITUTO');
            }
        });
        const suffix = el.querySelector('.title-suffix');
        if (suffix && /VSQX\s*&\s*UST DOWNLOAD/i.test(suffix.textContent)) {
            suffix.textContent = ' - ARCHIVE';
        }
    });

    document.querySelectorAll('.icon-name p').forEach(function(el) {
        if (el.textContent.trim().toLowerCase() === 'vsqx/ust') el.textContent = 'archive';
    });

    const folderNames = {
        'README': 'ReadMe',
        'VSQXs': 'Note',
        'USTs': 'Blog',
        'Instrumental': 'Music'
    };

    document.querySelectorAll('.folder-item p, .folder-item-vu p').forEach(function(el) {
        const current = el.textContent.trim();
        if (folderNames[current]) el.textContent = folderNames[current];
    });
}

updateDateTime();
setInterval(updateDateTime, 60000);

document.addEventListener('DOMContentLoaded', personalizeLegacyLabels);
