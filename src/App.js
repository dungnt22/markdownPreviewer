import './App.css';
import { Component } from 'react';

let marked = require("marked");

marked.setOptions({
  breaks: true
})

const renderer = new marked.Renderer();
renderer.link = function(href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      markdown: placeholder,
      editorMax: false,
      previewMax: false
    }
  }

  handleChange(event) {
    this.setState({
      markdown: event.target.value

    })
  }

  handleEditorMax() {
    this.setState({
      editorMax: !this.state.editorMax
    })
  }

  handlePreviewMax() {
    this.setState({
      previewMax: !this.state.previewMax
    })
  }

  render() {
    const classes = this.state.editorMax ? ['col-10 col-lg-6 input maximized', 'col-12 col-lg-8 output hide', 'bi bi-arrows-angle-contract']
                    : this.state.previewMax ? ['col-10 col-lg-6 input hide', 'col-12 col-lg-8 output maximized', 'bi bi-arrows-angle-contract']
                    : ['col-10 col-lg-6 input', 'col-12 col-lg-8 output', 'bi bi-arrows-fullscreen']
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className={classes[0]}>
            <Toolbar text="Editor" icon={classes[2]} onClick={() => this.handleEditorMax()}/>
            <textarea id="editor" type="text" onChange={(event) => this.handleChange(event)} value={this.state.markdown} />
          </div>
        </div>
      
        <div className="row justify-content-center">
          <div className={classes[1]}>
            <Toolbar text="Previewer" icon={classes[2]} onClick={() => this.handlePreviewMax()}/>
            <div id="preview"
              dangerouslySetInnerHTML={{
                __html: marked(this.state.markdown, {renderer: renderer})
              }}
            />
          </div>
        </div>
      </div>
    )
  }
}

const Toolbar = (props) => {
  return (
    <div className="toolbar align-items-center">
      <h6>{props.text}</h6>
      <i className={props.icon} onClick={props.onClick}/>
    </div>
  )
}

const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)`

export default App;
