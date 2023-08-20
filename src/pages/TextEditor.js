import React, { useState } from 'react';

function TextEditor() {
  const [boldActive, setBoldActive] = useState(false);
  const [italicActive, setItalicActive] = useState(false);
  const [underlineActive, setUnderlineActive] = useState(false);
  const [bulletActive, setBulletActive] = useState(false);

  const handleCommand = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  const handleToggleBold = () => {
    setBoldActive(!boldActive);
    handleCommand('bold');
  };

  const handleToggleItalic = () => {
    setItalicActive(!italicActive);
    handleCommand('italic');
  };

  const handleToggleUnderline = () => {
    setUnderlineActive(!underlineActive);
    handleCommand('underline');
  };

  const handleToggleBullet = () => {
    setBulletActive(!bulletActive);
    handleCommand('insertUnorderedList');
  };

  const handleToggleHighlight = () => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    
    const span = document.createElement('span');
    span.style.backgroundColor = 'yellow';
    
    range.surroundContents(span);
  };

  return (
    <div className="p-4">
      <div className='flex gap-6 mb-4'>
        <button onClick={handleToggleBold} className={boldActive ? 'active' : ''}>
          B
        </button>
        <button onClick={handleToggleItalic} className={italicActive ? 'active' : ''}>
          I
        </button>
        <button onClick={handleToggleUnderline} className={underlineActive ? 'active' : ''}>
          U
        </button>
        <button onClick={handleToggleBullet} className={bulletActive ? 'active' : ''}>
          •
        </button>
        <button onClick={handleToggleHighlight} className={'highlight'}>
          H
        </button>
      </div>
      <div
        contentEditable="true"
        className={`editor editor p-4 border ${bulletActive ? 'bullet-list' : ''}`}
      />
    </div>
  );
}

export default TextEditor;
