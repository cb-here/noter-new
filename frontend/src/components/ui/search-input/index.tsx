import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Search, X } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceTime?: number;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  debounceTime = 500,
  className,
}) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue);
      }
    }, debounceTime);

    return () => clearTimeout(timer);
  }, [localValue, debounceTime]);

  const handleClear = () => {
    setLocalValue('');
    onChange('');
  };

  return (
    <StyledWrapper className={className}>
      <div className="search-container">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
        />
        {localValue && (
          <button
            type="button"
            className="clear-button"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 100%;

  .search-container {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
  }

  .search-icon {
    position: absolute;
    left: 16px;
    color: var(--color-text-secondary, #9ca3af);
    pointer-events: none;
    z-index: 1;
  }

  .search-input {
    width: 100%;
    padding: 12px 44px 12px 48px;
    font-size: 16px;
    font-family: inherit;
    color: var(--color-text-primary, #fff);
    background: rgba(255, 255, 255, 0.05);
    border: 2px solid rgba(193, 163, 98, 0.3);
    border-radius: 12px;
    outline: none;
    transition: all 0.3s ease;

    &::placeholder {
      color: var(--color-text-secondary, #9ca3af);
    }

    &:focus {
      border-color: var(--color-primary, #c1a362);
      background: rgba(255, 255, 255, 0.08);
      box-shadow: 0 0 0 3px rgba(193, 163, 98, 0.1);
    }

    &:hover:not(:focus) {
      border-color: rgba(193, 163, 98, 0.5);
    }
  }

  .clear-button {
    position: absolute;
    right: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--color-text-secondary, #9ca3af);
    border-radius: 4px;
    transition: all 0.2s ease;

    &:hover {
      color: var(--color-text-primary, #fff);
      background: rgba(255, 255, 255, 0.1);
    }

    &:active {
      transform: scale(0.95);
    }
  }
`;

export default SearchInput;
