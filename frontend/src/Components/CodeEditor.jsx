// components/CodeEditor.jsx
import React from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

// Only import needed languages
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-cpp';

export const CodeEditor = ({ code, setCode, language }) => {
  const highlight = (code) => {
    const langMap = {
      python: Prism.languages.python,
      java: Prism.languages.java,
      cpp: Prism.languages.cpp
    };
    return Prism.highlight(code, langMap[language] || Prism.languages.python, language);
  };

  return (
    <Editor
      value={code}
      onValueChange={setCode}
      highlight={highlight}
      padding={12}
      style={{
        fontFamily: '"Fira code", monospace',
        fontSize: 14,
        backgroundColor: '#f5f5f5',
        border: '1px solid #ccc',
        borderRadius: '10px',
        minHeight: '180px',
        whiteSpace: 'pre',
        overflowX: 'auto'
      }}
    />
  );
};
