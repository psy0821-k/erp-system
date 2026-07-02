declare module '@toast-ui/editor' {
  type PreviewStyle = 'tab' | 'vertical';
  type EditType = 'markdown' | 'wysiwyg';

  type ImageBlobHookCallback = (url: string, text?: string) => void;

  interface ToastUIEditorOptions {
    el: HTMLElement;
    height?: string;
    initialEditType?: EditType;
    previewStyle?: PreviewStyle;
    initialValue?: string;
    useCommandShortcut?: boolean;
    toolbarItems?: string[][];
    hooks?: {
      addImageBlobHook?: (blob: Blob, callback: ImageBlobHookCallback) => void | Promise<void>;
    };
    events?: {
      change?: () => void;
    };
  }

  export default class ToastUIEditor {
    constructor(options: ToastUIEditorOptions);
    getHTML(): string;
    setHTML(html: string): void;
    destroy(): void;
  }
}
