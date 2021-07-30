export default function(assemblyName, callback, origin) {
    const allowedOrigin = origin || window.location.origin;
    window.addEventListener("message", event => {
        if(event.origin === allowedOrigin && !!event.data && event.data.type === "inetsoftExternalUrls") {
            if(!!event.data.urls && Object.prototype.hasOwnProperty.call(event.data.urls, assemblyName)) {
                const url = event.data.urls[assemblyName];
                const token = event.data.token;
                const options = { headers: { "X-XSRF-TOKEN": token } };
                fetch(url, options)
                    .then(response => response.json())
                    .then(data => callback(data));
            }
        }
    });
    window.parent.postMessage({type: "inetsoftGetExternalUrls"}, allowedOrigin);
}
