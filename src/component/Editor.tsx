import React, { useMemo, useRef } from 'react';

import dynamic from 'next/dynamic';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

interface EditorProps {
  content: string;
  setContent: (content: string) => void;
  readonly?: boolean;
}

export const Editor: React.FC<EditorProps> = ({
  content,
  setContent,
  readonly,
}) => {
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

  const readonlyConfig = useMemo(
    () => ({
      useSearch: false,
      toolbar: false,
      readonly: true,
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
      inline: true,
      toolbarInlineForSelection: true,
      showPlaceholder: false,
    }),
    [],
  );

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={readonly ? readonlyConfig : config}
      onChange={newContent => setContent(newContent)}
    />
  );
};
