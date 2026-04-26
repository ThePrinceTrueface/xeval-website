# xeval.js 🚀

**xeval.js** is a high-performance, lightweight (sub-2KB), and dependency-free JavaScript library for dynamic script injection and state manipulation. It features a built-in template engine for safe and deep data interpolation into injected code.

Developed by **Prince True-face** at **Ebinasoft**.

## Key Features

- ⚡ **Turbo Injection**: Rapid script injection into the DOM with support for standard or module types.
- 🧩 **Deep Template Engine**: Interpolate objects, arrays, and even functions directly into your script sources using a simple `$$key` syntax.
- 🏗️ **HTML & CSS Support**: Now supports preparation and injection of HTML and CSS templates with full interpolation.
- 🔄 **Sync & Async Support**: Load scripts from raw strings or fetch them from remote URLs.
- 🧹 **Registry & Cleanup**: Automatically tracks injected scripts and allows for easy DOM cleanup.
- 🛠️ **Developer Friendly**: Written with clean JSDoc for full IntelliSense support.

## Installation

### Via CDN
Add this to your HTML:
```html
<script src="https://xeval.surge.sh/xeval.js" type="module"></script>
```

### Manual Download
Download `xeval.js` from the [official website](https://xeval.surge.sh) and include it in your project.

## Usage

### Basic Injection
```javascript
import xeval from '@ebinasoft/xeval';

const script = xeval.prepare(`
  console.log("Hello, $$name!");
  $$fn
  fn();
`);

script.inject({
  context: {
    name: "Developer",
    fn: () => console.log("xeval logic layer active.")
  }
});
```

### HTML Injection
```javascript
const engine = xeval.prepareHTML(`
  <div class="card">
    <h1>$$title</h1>
    <p>$$content</p>
  </div>
`);

engine.inject({
  context: {
    title: "Hello World",
    content: "This was injected by xeval.js"
  }
});
```

### Remote Loading
```javascript
const engine = await xeval.loadFrom('https://api.example.com/logic.js');
engine.inject({ context: { theme: 'dark' } });
```

### Cleanup
```javascript
const engine = xeval.prepare("...");
engine.inject();
// Later...
engine.cleanup(); // Removes only the scripts injected by this engine instance
```

## Documentation

Full documentation is available at [xeval.surge.sh](https://xeval.surge.sh).

## GitHub Repository
[https://github.com/ThePrinceTrueface/xeval.js](https://github.com/ThePrinceTrueface/xeval.js)

## License

SPDX-License-Identifier: Apache-2.0

---
Powered by **Ebinasoft**
Created by **Prince True-face**
