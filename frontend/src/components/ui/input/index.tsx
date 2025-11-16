import React from 'react';
import styled from 'styled-components';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <StyledWrapper className={className}>
        <div className="form__group field">
          <input
            type="text"
            className="form__field"
            placeholder={label}
            ref={ref}
            {...props}
          />
          <label className="form__label">{label}</label>
        </div>
        {error && <span className="error-message">{error}</span>}
      </StyledWrapper>
    );
  }
);

Input.displayName = 'Input';

const StyledWrapper = styled.div`
  .form__group {
    position: relative;
    padding: 20px 0 0;
    width: 100%;
  }

  .form__field {
    font-family: inherit;
    width: 100%;
    border: none;
    border-bottom: 2px solid var(--color-border);
    outline: 0;
    font-size: 17px;
    color: var(--color-text-primary);
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s;
  }

  .form__field::placeholder {
    color: transparent;
  }

  .form__field:placeholder-shown ~ .form__label {
    font-size: 17px;
    cursor: text;
    top: 20px;
  }

  .form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 17px;
    color: var(--color-text-secondary);
    pointer-events: none;
  }

  .form__field:focus {
    padding-bottom: 6px;
    font-weight: 700;
    border-width: 3px;
    border-image: linear-gradient(to right, var(--color-primary), var(--color-primary-hover));
    border-image-slice: 1;
  }

  .form__field:focus ~ .form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 17px;
    color: var(--color-primary);
    font-weight: 700;
  }

  /* reset input */
  .form__field:required,
  .form__field:invalid {
    box-shadow: none;
  }

  .error-message {
    display: block;
    color: #ef4444;
    font-size: 14px;
    margin-top: 4px;
  }
`;

export default Input;
