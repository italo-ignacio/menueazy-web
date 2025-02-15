import { Button } from '@mui/material';
import { ShowFileList } from 'presentation/atomic-component/atom/show-file-list';
import { UploadFile } from '@mui/icons-material';
import { colors } from 'presentation/style';
import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, DragEvent, FC, ReactNode } from 'react';

interface FileDropProps {
  isMultiple?: boolean;
  subtitle?: ReactNode | string;
  startValue: File[];
  onChange: (newValue: File[]) => void;
  accept?: string[];
}

export const FileDrop: FC<FileDropProps> = ({
  onChange,
  subtitle,
  accept,
  startValue,
  isMultiple
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState(startValue);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
  };

  const handleChange = (
    dropEvent?: DragEvent<HTMLDivElement>,
    changeEvent?: ChangeEvent<HTMLInputElement>
  ): void => {
    const newFiles = [...files];

    if (dropEvent) {
      if (dropEvent.dataTransfer?.files) newFiles.push(...dropEvent.dataTransfer.files);
    } else if (changeEvent)
      if (changeEvent.target?.files) newFiles.push(...changeEvent.target.files);

    const acceptedFiles = accept
      ? newFiles.filter(
          (file) =>
            accept.includes(file.type) ||
            (file.type.startsWith('image/') && accept.includes('image/*'))
        )
      : newFiles;

    setFiles(acceptedFiles);
    setIsDragging(false);
  };

  const onDrop = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    handleChange(event, undefined);
  };

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>): void => {
    handleChange(undefined, event);
  };

  const removeByIndex = (index: number): void => {
    const newFiles = files.filter((_, fileIndex) => fileIndex !== index);

    setFiles(newFiles);
  };

  const onDragEnter = (event: DragEvent<HTMLDivElement>): void => {
    event.stopPropagation();
    setIsDragging(true);
  };

  const onDragLeave = (event: DragEvent<HTMLDivElement>): void => {
    event.stopPropagation();

    const rect = event.currentTarget.getBoundingClientRect();
    const isOutside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;

    if (isOutside) setIsDragging(false);
  };

  useEffect(() => {
    onChange(files);
  }, [files]);

  return (
    <>
      <div
        className={
          'border-2 border-[#00000040] gap-6 border-dashed flex justify-between flex-col tablet:flex-row items-center p-6 rounded-md'
        }
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={handleDragOver}
        onDrop={onDrop}
        style={{
          backgroundColor: isDragging ? colors.gray[150] : undefined,
          borderColor: isDragging ? colors.blue.semiLight : undefined
        }}
      >
        <div>
          <UploadFile sx={{ color: colors.gray[500], fontSize: 42 }} />
        </div>

        <div className={'w-full'}>
          <h2>Selecione os arquivos</h2>
          <p className={'text-sm text-gray-550'}>{subtitle}</p>
        </div>

        <div className={'min-w-max'}>
          <Button
            color={'info'}
            onClick={(): void => {
              inputRef.current?.click();
            }}
            variant={'outlined'}
          >
            Selecionar Arquivos
          </Button>
        </div>

        <input
          accept={accept?.join(',')}
          className={'hidden'}
          multiple={isMultiple}
          onChange={onChangeInput}
          ref={inputRef}
          type={'file'}
        />
      </div>

      <ShowFileList fileList={files} onDelete={removeByIndex} />
    </>
  );
};
