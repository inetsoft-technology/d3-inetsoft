function normalizeTable(table) {
    let columns = undefined;

    if(table.headerRowCount === 0) {
        columns = Array(table.headerRowCount).fill(1).map((_, index) => `column${index + 1}`);
    }
    else {
        columns = [...table.rows[0].values];
    }

    const data = table.rows.slice(table.headerRowCount).map(row => {
        const value = {};

        for(let i = 0; i < table.colCount; i++) {
            value[columns[i]] = row.values[i];
        }

        return value;
    });

    data.columns = columns;
    return data;
}

export default function(assemblyName, callback, origin, normalize) {
    const allowedOrigin = origin || window.location.origin;
    window.addEventListener("message", event => {
        if(event.origin === allowedOrigin && !!event.data && event.data.type === "inetsoftExternalUrls") {
            if(!!event.data.urls && Object.prototype.hasOwnProperty.call(event.data.urls, assemblyName)) {
                const url = event.data.urls[assemblyName];
                const token = event.data.token;
                const options = { headers: { "X-XSRF-TOKEN": token } };
                fetch(url, options)
                    .then(response => response.json())
                    .then(table => normalize ? normalizeTable(table) : table)
                    .then(data => callback(data));
            }
        }
    });
    window.parent.postMessage({type: "inetsoftGetExternalUrls"}, allowedOrigin);
}
