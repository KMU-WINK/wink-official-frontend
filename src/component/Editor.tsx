import React, { useMemo, useRef } from 'react';

import dynamic from 'next/dynamic';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

interface EditorProps {
  content: string;
  setContent: (content: string) => void;
}

export const Editor: React.FC<EditorProps> = ({ content, setContent }) => {
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      useSearch: false,
      toolbarAdaptive: false,
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      uploader: {
        insertImageAsBase64URI: true,
      },
      buttons:
        'bold,italic,underline,strikethrough,|,fontsize,paragraph,lineHeight,|,ul,ol,indent,outdent,left,|,hr,table,|,link,image',
    }),
    [],
  );

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      onChange={(newContent) => setContent(newContent)}
    />
  );
};
