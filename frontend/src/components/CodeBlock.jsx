import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, Code } from 'lucide-react';
import './CodeBlock.css';

export default function CodeBlock({ code, language = 'go', filename = '' }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Custom styles for syntax highlighter to integrate with our design system
  const customStyle = {
    margin: 0,
    background: 'transparent',
    padding: 'var(--space-md)',
    fontSize: '0.9rem',
    fontFamily: 'var(--font-mono)',
  };

  return (
    <div className="code-block-wrapper glass-card">
      <div className="code-block-header">
        <div className="code-block-info">
          <Code size={16} className="text-accent" />
          <span className="code-block-filename">{filename || language.toUpperCase()}</span>
        </div>
        <button
          onClick={copyToClipboard}
          className="code-block-copy btn btn-sm btn-ghost"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check size={14} className="text-success" />
              <span className="text-success">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="code-block-content">
        <SyntaxHighlighter
          language={language}
          style={tomorrow}
          customStyle={customStyle}
          codeTagProps={{ style: { fontFamily: 'var(--font-mono)' } }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
