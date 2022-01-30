import React from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';//for snow theme
import 'react-quill/dist/quill.bubble.css'; //for bubble theme
import './App.css';

const Quill = ReactQuill.Quill;
var Font = Quill.import("formats/font");
Font.whitelist = ["Roboto", "Vazir", "Vazir-Bold"];
Quill.register(Font, true);

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = { editorHtml: '', theme: 'snow' }
    this.handleChange = this.handleChange.bind(this)
  }
  
  handleChange (html) {
  	this.setState({ editorHtml: html });
  }
  
  handleThemeChange (newTheme) {
    if (newTheme === "core") newTheme = null;
    this.setState({ theme: newTheme })
  }
  
  render () {
    return (
      <div>
        <ReactQuill 
          theme={this.state.theme}
          onChange={this.handleChange}
          value={this.state.editorHtml}
          modules={App.modules}
          formats={App.formats}
          // bounds={'.app'}
          readOnly={this.props.readOnly}
          placeholder={this.props.placeholder}
         />
        <div className="themeSwitcher">
          <label>Theme </label>
          <select onChange={(e) => 
              this.handleThemeChange(e.target.value)}>
            <option value="snow">Snow</option>
            <option value="bubble">Bubble</option>
            {/* <option value="core">Core</option> */}
          </select>
        </div>
       </div>
     )
  }
}

/* 
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
App.modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': Font.whitelist }],
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'direction': 'rtl' }] ,
    [{ 'align': [] }],
    [{'list': 'ordered'}, {'list': 'bullet'},
    {'indent': '-1'}, {'indent': '+1'}],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript 
    ['code-block'],
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from 
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
}
/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
App.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'direction',
  'align',
  'list', 'bullet', 'indent',
  'link', 'image', 'video',
  'script',
  'code-block',
  'color', 'background',
]

/* 
 * PropType validation
 */
App.propTypes = {
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
}

/* 
 * DefaultProps Value
 */
App.defaultProps = {
  placeholder: 'Write something...',
  readOnly: false
};


export default App;