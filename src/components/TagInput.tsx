'use client';

import { useState } from 'react';
import CloseSvg from '@/assets/svg/close.svg';
import Input from '@/components/Input';
import Label from '@/components/Label';
import useToast from '@/hooks/useToast';

interface TagInputProps {
  label?: string;
  name?: string;
  defaultTags?: string[];
}

const TagInput = ({ label, name, defaultTags }: TagInputProps) => {
  const { enqueueWarningBar } = useToast();

  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState<string[]>(defaultTags || []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleRemoveTag = (newTag: string) => {
    setTags(tags.filter((tag) => tag !== newTag));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) {
      return;
    }

    if (e.key === 'Enter' && inputValue.trim() !== '') {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (tags.includes(newTag)) {
        enqueueWarningBar('이미 추가된 태그입니다.', 'error');
        return;
      }
      setTags([...tags, newTag]);
      setInputValue('');
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <Input
        id="tags"
        placeholder="태그를 입력하세요"
        label={label}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        value={inputValue}
      />
      <div className="flex flex-wrap items-center gap-1">
        {tags.map((tag) => (
          <Label key={tag}>
            <span>{tag}</span>
            <button
              className="fill-slate-200 hover:fill-slate-50"
              type="button"
              onClick={() => handleRemoveTag(tag)}
            >
              <CloseSvg width={16} height={16} />
            </button>
            <input type="hidden" name={name} value={tag} />
          </Label>
        ))}
      </div>
    </div>
  );
};

export default TagInput;
