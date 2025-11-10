# Share widget 
[![GitHub Actions Status Badge](https://github.com/miguelcolmenares/share-widget/workflows/CodeQL/badge.svg)](https://github.com/miguelcolmenares/share-widget/actions/workflows/codeql-analysis.yml)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/miguelcolmenares/share-widget) 
[![](https://data.jsdelivr.com/v1/package/gh/miguelcolmenares/share-widget/badge?style=rounded)](https://www.jsdelivr.com/package/gh/miguelcolmenares/share-widget)

> Add a floating widget to open Share options

**Note:** This project has been migrated to TypeScript for better type safety and maintainability, while maintaining the same API and functionality.

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
## Widget Options

| Argument  | Type    | Default |
| ----------|:--------:| ----:|
| button    | `Object`  | `{}` |
| header    | `Object`  | `{}` |
| networks  | `Array`   | `[]` |



### Header Options

| Argument  | Type    | Default |
| ----------|:--------:| ----:|
| background | `String` | `""` |
| title     | `String` | `""` |

### Button Options
| Argument  | Type    | Default |
| ----------|:--------:| ----:|
| color     | `String` | `""` |

### Network Options
| Argument  | Type    | Default | Options |
| ----------|:--------:| ----:| -------:|
| color     | `String` | `""` | |
| name      | `String` | `""` | |
| network   | `String` | `""` |  `email`, `facebook`, `twitter`, `whatsapp` |

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

## Development

This project is built with TypeScript and uses Webpack for bundling.

### Prerequisites
- Node.js >= 20
- npm >= 10

### Build
```bash
npm install
npm run build
```

### Lint
```bash
npm run lint
```

### Project Structure
- `src/ts/` - TypeScript source files
- `src/types/` - TypeScript type definitions
- `src/less/` - LESS stylesheets
- `dist/` - Compiled output (CSS, JS, fonts)


