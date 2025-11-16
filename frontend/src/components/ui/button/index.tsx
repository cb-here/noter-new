import React from 'react';
import styled from 'styled-components';

type ButtonVariant = 'primary' | 'outline' | 'error';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'outline',
  children,
  className,
  ...props
}) => {
  return (
    <StyledWrapper variant={variant}>
      <button className={`button ${className || ''}`} {...props}>
        {children}
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div<{ variant: ButtonVariant }>`
  .button {
    cursor: pointer;
    position: relative;
    padding: 10px 24px;
    font-size: 18px;
    border: 2px solid;
    border-radius: 34px;
    font-weight: 600;
    transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
    overflow: hidden;

    /* Variant styles */
    ${({ variant }: any) => {
      switch (variant) {
        case 'primary':
          return `
            color: #212121;
            border-color: var(--color-primary);
            background-color: var(--color-primary);

            &::before {
              background-color: #212121;
            }

            &:hover {
              color: var(--color-primary);
              box-shadow: 0 0px 20px rgba(193, 163, 98, 0.4);
            }
          `;
        case 'outline':
          return `
            color: var(--color-primary);
            border-color: var(--color-primary);
            background-color: transparent;

            &::before {
              background-color: var(--color-primary);
            }

            &:hover {
              color: #212121;
              box-shadow: 0 0px 20px rgba(193, 163, 98, 0.4);
            }
          `;
        case 'error':
          return `
            color: #212121;
            border-color: rgb(239, 68, 68);
            background-color: rgb(239, 68, 68);

            &::before {
              background-color: #212121;
            }

            &:hover {
              color: rgb(239, 68, 68);
              box-shadow: 0 0px 20px rgba(239, 68, 68, 0.4);
            }
          `;
      }
    }}
  }

  .button::before {
    content: '';
    position: absolute;
    inset: 0;
    margin: auto;
    width: 100%;
    height: 50px;
    border-radius: inherit;
    scale: 0;
    z-index: -1;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
  }

  .button:hover::before {
    scale: 3;
  }

  .button:hover {
    scale: 1.1;
  }

  .button:active {
    scale: 1;
  }

  .button:disabled {
    opacity: 0.5;
    cursor: not-allowed;

    &:hover {
      scale: 1;
    }

    &:hover::before {
      scale: 0;
    }
  }
`;

export default Button;
