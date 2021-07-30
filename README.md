# d3-inetsoft

This module provides integration with InetSoft dashboards. It will only work when the enclosing HTML page is embedded in a dashboard. For example, to load data from a dashboard table named `D3DataTable`:

```js
function loadData(table) {
    console.log("Table loaded: ", table);
}

d3.inetsoft("D3DataTable", loadData);
```

The handler function receives a [`TableData`](https://www.inetsoft.com/docs/2020.1/web-api/#worksheets-open-data_response_fields) object. This will be called when the dashboard is first loaded and whenever the data has changed, for example when a selection is modified.

By default, it is assumed that the InetSoft dashboard is served from the same domain as the D3 chart HTML page. If this is not the case, there is an optional third argument to `d3.inetsoft()` for the origin of the InetSoft dashboard. For example, if the dashboard is served from `inetsoft.example.com`, you would use:

```js
d3.inetsoft("D3DataTable", loadData, "https://inetsoft.example.com");
```

## Installing

If you use npm, `npm install @inetsoft/d3-inetsoft`. You can also download the [latest release on GitHub](https://github.com/inetsoft-technology/d3-inetsoft/releases/latest). For use in a browser, you can load d3-inetsoft's UMD bundle from an npm based CDN such as jsDelivr; a `d3` global is exported:

```html
<script src="https://cdn.jsdelivr.net/npm/@inetsoft/d3-inetsoft@1.0.2"></script>
<script>
    d3.inetsoft("D3DataTable", loadData)
</script>
```

## API Reference

<a name="inetsoft" href="#inetsoft">#</a> d3.<b>inetsoft</b>(<i>assemblyName</i>, <i>callback</i>[, <i>origin</i>]) · [Source](https://github.com/inetsoft-technology/d3-inetsoft/blob/master/src/inetsoft.js "Source")

Connects to the enclosing dashboard and loads data from the specified assembly. If <i>origin</i> is specified, only message events with that origin are accepted. Otherwise, only message events with the same origin as the HTML page are accepted. When new data is received <i>callback</i> is invoked with a [`TableData`](https://www.inetsoft.com/docs/2020.1/web-api/#worksheets-open-data_response_fields) object as the argument.
