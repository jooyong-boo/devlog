'use client';

import { useState } from 'react';
import CloseSvg from '@/assets/svg/close.svg';
import Input from '@/components/Input';
import Label from '@/components/Label';

const TagInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState<string[]>([]);

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
        // TODO: Toast 추가하기
        // enqueueDefaultBar('이미 추가된 태그입니다.', 'error');
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
        placeholder="태그 입력"
        label="태그"
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        value={inputValue}
      />
      <div className="flex flex-wrap items-center gap-1">
        {tags.map((tag) => (
          <Label key={tag}>
            <span>{tag}</span>
            <button
              className="h-4 w-4 fill-slate-200 hover:fill-slate-50"
              type="button"
              onClick={() => handleRemoveTag(tag)}
            >
              <CloseSvg />
            </button>
          </Label>
        ))}
      </div>
    </div>
  );
};

export default TagInput;
