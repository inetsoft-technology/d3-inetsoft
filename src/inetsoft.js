function isOriginAllowed(allowedOrigin, sourceOrigin) {
    return (!!allowedOrigin && sourceOrigin === allowedOrigin) || (sourceOrigin == window.location.origin);
}

function loadData(url, token, callback) {
    const options = { headers: { "X-XSRF-TOKEN": token } };
    fetch(url, options)
        .then(response => response.json())
        .then(data => callback(data));
}

export default function(assemblyName, callback, origin) {
    window.addEventListener("message", event => {
        if(isOriginAllowed(origin, event.orgin) && !!event.data && event.data.type === "inetsoftExternalUrls") {
            if(!!event.data.urls && Object.prototype.hasOwnProperty.call(event.data.urls, assemblyName)) {
                const url = event.data.urls[assemblyName];
                const token = event.data.token;
                loadData(url, token, callback);
            }
        }
    });
}
