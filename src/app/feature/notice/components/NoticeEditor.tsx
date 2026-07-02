'use client';

import { useEffect, useRef } from 'react';
import type ToastUIEditor from '@toast-ui/editor';

import '@toast-ui/editor/dist/toastui-editor.css';

import { uploadNoticeImage } from '../api/noticeApi';

type ImageBlobHookCallback = (url: string, text?: string) => void;

interface Props {
  initialValue?: string;
  onChange: (value: string) => void;
}

export default function NoticeEditor({ initialValue = '', onChange }: Props) {
  const editorContainerRef = useRef<HTMLDivElement | null>(null);
  const editorInstanceRef = useRef<ToastUIEditor | null>(null);

  useEffect(() => {
    if (!editorContainerRef.current) return;
    if (editorInstanceRef.current) return;

    let isMounted = true;

    const createEditor = async () => {
      const ToastUIEditorModule = await import('@toast-ui/editor');
      const ToastUIEditorClass = ToastUIEditorModule.default;

      if (!isMounted || !editorContainerRef.current) return;

      const editor = new ToastUIEditorClass({
        el: editorContainerRef.current,
        height: '420px',
        initialEditType: 'wysiwyg',
        previewStyle: 'vertical',
        initialValue: initialValue || ' ',
        useCommandShortcut: true,
        toolbarItems: [
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task'],
          ['table', 'link'],
          ['image'],
          ['code', 'codeblock'],
        ],
        hooks: {
          addImageBlobHook: async (blob: Blob, callback: ImageBlobHookCallback) => {
            const file =
              blob instanceof File
                ? blob
                : new File([blob], 'notice-image.png', {
                    type: blob.type,
                  });

            const imageUrl = await uploadNoticeImage(file);
            callback(imageUrl, file.name);
          },
        },
        events: {
          change: () => {
            onChange(editor.getHTML());
          },
        },
      });

      editorInstanceRef.current = editor;
    };

    createEditor();

    return () => {
      isMounted = false;
      editorInstanceRef.current?.destroy();
      editorInstanceRef.current = null;
    };
  }, [initialValue, onChange]);

  return <div ref={editorContainerRef} />;
}
