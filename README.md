# Share widget 
[![GitHub Actions Status Badge](https://github.com/miguelcolmenares/share-widget/workflows/CodeQL/badge.svg)](https://github.com/miguelcolmenares/share-widget/actions/workflows/codeql-analysis.yml)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/miguelcolmenares/share-widget) 
[![](https://data.jsdelivr.com/v1/package/gh/miguelcolmenares/share-widget/badge?style=rounded)](https://www.jsdelivr.com/package/gh/miguelcolmenares/share-widget)

> Add a floating widget to open Share options

## Getting Started

Add this javascript at the end of your page:
```html
<script type="text/javascript">
        !function (s, h, a, r, e, w) {
            s.shareWidget || (
                e = h.createElement(a),
                e.src = r,
                w = h.getElementsByTagName(a)[0],
                w.parentNode.insertBefore(e, w)
            )
        }(window, document, "script", "https://cdn.jsdelivr.net/gh/miguelcolmenares/share-widget/dist/js/share-widget.js");
        window.addEventListener('load', function () {
            new shareWidget({
                header: {
                    background: "#dd181c",
                    title: "Share this on",
                },
                button: {
                    color: "#dd181c"
                },
                networks: [{
                        network: "whatsapp",
                        name: "Whatsapp",
                        color: "#18e27a"
                    },
                    {
                        network: "facebook",
                        name: "Facebook",
                        color: "#3a559f"
                    },
                    {
                        network: "twitter",
                        name: "Twitter",
                        color: "#55acee"
                    },
                    {
                        network: "email",
                        name: "Correo",
                        color: "#000"
                    }]
            })
        });
    </script>
```
## Options
#### button
Type: `Object`  
Default: `{}`
#### header
Type: `Object`  
Default: `{}`
#### networks
Type: `Array`  
Default: `[]`

### Header Options
#### background
Type: `String`  
Default: `""`
#### color
Type: `String`  
Default: `""`

### Button Options
#### color
Type: `String`  
Default: `""`

### Network Options
#### color
Type: `String`  
Default: `""`
#### name
Type: `String`  
Default: `""`
#### network
Type: `String`  
Default: `""`  
Posibble values: `email`, `facebook`, `twitter`, `whatsapp`

## Example:
```javascript
new shareWidget({
    header: {
        background: "#dd181c",
        title: "Share this on",
    },
    button: {
        color: "#dd181c"
    },
    networks: [
    {
        network: "facebook",
        name: "Facebook",
        color: "#3a559f"
    },
    {
        network: "twitter",
        name: "Twitter",
        color: "#55acee"
    }]
})
```
