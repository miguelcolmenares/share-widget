# Share widget 
![GitHub release (latest by date)](https://img.shields.io/github/v/release/miguelcolmenares/share-widget) 
![alt text](https://data.jsdelivr.com/v1/package/gh/miguelcolmenares/share-widget/badge "JsDelivr")

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
        }(window, document, "script", "https://cdn.jsdelivr.net/gh/miguelcolmenares/share-widget@latest/dist/js/share-widget.js");
        window.onload = function () {
            new shareWidget({
                backgroundTitle: "#dd181c",
                colorIcon: "#dd181c",
                title: "Comparte en",
                buttons: [{
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
        };
    </script>
```

## Options

### backgroundTitle
Type: `String`    
Default: `""`

### buttons
Type: `Array`   
Default: `[]`

### colorIcon
Type: `String`  
Default: `""`

### colorTitle
Type: `String`
Default: `""`

### title
Type: `String`
Default: `""`

## Button Options

### color
Type: `String`
Default: `""`

### name
Type: `String`   
Default: `""`

### network
Type: `String`      
Default: `""`   
Posibble values: `email`, `facebook`, `twitter`, `whatsapp`

## Example:
```javascript
new shareWidget({
    backgroundTitle: "#dd181c",
    colorIcon: "#dd181c",
    title: "Comparte en",
    buttons: [
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
