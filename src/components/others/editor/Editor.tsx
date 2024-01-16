import '~/utils/highlight';
//
import { Backdrop, CircularProgress } from '@mui/material';
import { useMemo, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { usePostApiServicesAppImageUploadImage } from '~/api';
import { handleAxiosError } from '~/utils/axios';
import EditorToolbar, { formats } from './EditorToolbar';
import { StyledEditor } from './styles';
import { EditorProps } from './types';

const Image = Quill.import('formats/image');
Image.sanitize = (url: string) => url;

export default function Editor({
  id = 'minimal-quill',
  error,
  value,
  onChange,
  simple = true,
  helperText,
  sx,
  disabled,
  ...other
}: EditorProps) {
  const { mutate: uploadImage, isPending: uploadingImage } = usePostApiServicesAppImageUploadImage();
  const quillRef = useRef<ReactQuill | null>(null);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: `#${id}`,
        handlers: {
          image: function () {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            input.click();
            input.onchange = () => {
              const file = input && input.files ? input.files[0] : null;
              if (!file) return;
              uploadImage(
                { data: { image: file } },
                {
                  onSuccess: (url) => {
                    if (!quillRef.current) return;
                    const editor = quillRef.current.getEditor();
                    const range = editor.getSelection();
                    editor.insertEmbed(range?.index || 0, 'image', url);
                  },
                  onError: handleAxiosError,
                }
              );
            };
          },
        },
      },
      history: {
        delay: 500,
        maxStack: 100,
        userOnly: true,
      },
      syntax: true,
      clipboard: {
        matchVisual: false,
      },
    }),
    []
  );

  return (
    <>
      <StyledEditor
        sx={{
          ...(error && {
            border: (theme) => `solid 1px ${theme.palette.error.main}`,
          }),
          ...sx,
        }}
      >
        <EditorToolbar id={id} isSimple={simple} disabled={disabled} />

        <ReactQuill
          ref={quillRef}
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          readOnly={disabled}
          {...other}
        />

        {uploadingImage && (
          <Backdrop open sx={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress />
          </Backdrop>
        )}
      </StyledEditor>

      {helperText && helperText}
    </>
  );
}
