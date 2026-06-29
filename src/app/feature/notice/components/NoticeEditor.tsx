'use client';

import dynamic from 'next/dynamic';
import { useRef } from 'react';
import type { Editor as ToastEditor } from '@toast-ui/react-editor';

import '@toast-ui/editor/dist/toastui-editor.css';

import { uploadNoticeImage } from '../api/noticeApi';

const Editor = dynamic(() => import('@toast-ui/react-editor').then(mod => mod.Editor), {
  ssr: false,
});

type ImageBlobHookCallback = (url: string, text?: string) => void;

interface Props {
  initialValue?: string;
  onChange: (value: string) => void;
}

export default function NoticeEditor({ initialValue = '', onChange }: Props) {
  const editorRef = useRef<ToastEditor | null>(null);

  return (
    <Editor
      ref={editorRef}
      initialValue={initialValue || ' '}
      previewStyle="vertical"
      height="420px"
      initialEditType="wysiwyg"
      useCommandShortcut
      onChange={() => {
        const editorInstance = editorRef.current?.getInstance();
        const html = editorInstance?.getHTML() ?? '';

        onChange(html);
      }}
      hooks={{
        addImageBlobHook: async (blob: Blob, callback: ImageBlobHookCallback) => {
          const file = blob instanceof File ? blob : new File([blob], 'notice-image.png', { type: blob.type });

          const imageUrl = await uploadNoticeImage(file);

          callback(imageUrl, file.name);
        },
      }}
      toolbarItems={[
        ['heading', 'bold', 'italic', 'strike'],
        ['hr', 'quote'],
        ['ul', 'ol', 'task'],
        ['table', 'link'],
        ['image'],
        ['code', 'codeblock'],
      ]}
    />
  );
}
