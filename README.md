
<h1 align="center">
  <br>
  <a href="https://github.com/hgvmp/discord-bot"><img src="https://discordapp.com/assets/e4923594e694a21542a489471ecffa50.svg" alt="HGVMP" width="400"></a>
  <br>
  HGVMP Discord Bot
  <br>
</h1>

<h4 align="center">A community bot built on top of <a href="https://discord.js.org/" target="_blank">Discord.js</a>.</h4>

<p align="center">
  <a href="#how-to-use">How To Use</a> •
  <a href="#credits">Credits</a> •
  <a href="#style-guide">Style Guide</a> •
  <a href="#license">License</a>
</p>

![screenshot](https://i.imgur.com/tZVDraX.png)

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/hgvmp/discord-bot

# Go into the repository
$ cd discord-bot

# Install dependencies
$ npm install

# Run the app
$ npm start
```

Note: If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.


## Credits

This software uses code from several open source packages.

- [Node.js](https://nodejs.org/)
- [Discord.js](https://discord.js.org)
- [cleverbot-node](https://www.npmjs.com/package/cleverbot-node)
- [bugsnag](https://www.npmjs.com/package/bugsnag)
- [dateformat](https://www.npmjs.com/package/dateformat)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [moment](https://www.npmjs.com/package/moment)
- [request](https://www.npmjs.com/package/request)
- [superagent](https://www.npmjs.com/package/superagent)
- [time-ago](https://www.npmjs.com/package/time-ago)
- [ffmpeg-binaries](https://www.npmjs.com/package/ffmpeg-binaries)
- [node-opus](https://www.npmjs.com/package/node-opus)
- [opusscript](https://www.npmjs.com/package/opusscript)
- [profanities](https://www.npmjs.com/package/profanities)




## Style Guide

The HGVMP developers follow the AirBnB style guide for every project they create, including the Discord bot. Style guides provide three benefits that make development more efficient:

- Code that's easier to read
- Clear guidelines when writing code
- Predictable file and variable names

Consistent style choices greatly benefit readability. For example, they mean that indentation reliably communicates the structure of your code. 
Variable naming conventions allow you to immediately see that `LoginDialog` is a class, `loginDialog` is a class instance and `LOGIN_DIALOG` is a constant.

Credits to [codereadability](http://www.codereadability.com) and their amazing [read](http://www.codereadability.com/why-use-a-style-guide/) on why style guides are handy.

&nbsp;

### Install ESLint &amp; AirBnB
```bash
# Install ESLint
$ npm install eslint --save-dev

# Install AirBnB
$ npm install eslint-config-airbnb --save-dev

# Install a peerdeps
$ npm install -g install-peerdeps

# Install peer dependencies
$ install-peerdeps eslint-config-airbnb --dev
```
&nbsp;


### ESLint Configuration
```json
{
	"extends": [
		"airbnb"
	],
	"rules": {
		"linebreak-style": "off"
	}
}
```

&nbsp;
### Visual Studio Code Configuration
```json
{
  "editor.tabSize": 2,
  "editor.detectIndentation": true,
  "[javascript]": {
    "editor.tabSize": 2
  },
  "[json]": {
    "editor.tabSize": 2
  },
  "[php]": {
    "editor.tabSize": 4
  },

  "emmet.triggerExpansionOnTab": true,
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },

  "editor.wordWrap": "wordWrapColumn",
  "editor.wordWrapColumn": 100,
  "editor.rulers": [
    100
  ],

  "eslint.enable": true,

  "eslint.autoFixOnSave": true
}

```


## License

MIT

---

> [hgvmp.com](https://hgvmp.com) &nbsp;&middot;&nbsp;
> GitHub [@hgvmp](https://github.com/hgvmp) &nbsp;&middot;&nbsp;
> Discord [@hgvmp](https://discord.hgvmp.com)
