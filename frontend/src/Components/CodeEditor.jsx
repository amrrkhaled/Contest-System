import React from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-cpp';

export const CodeEditor = ({ code, setCode, language }) => {
  const highlight = (code) =>
    Prism.highlight(code, Prism.languages[language] || Prism.languages.python, language);

  return (
    <Editor
      value={code}
      onValueChange={setCode}
      highlight={highlight}
      padding={10}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 14,
        backgroundColor: '#f5f5f5',
        borderRadius: '5px',
        minHeight: '300px',
      }}
    />
  );
};
