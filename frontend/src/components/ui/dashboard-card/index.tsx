import React from 'react';
import styled from 'styled-components';

interface DashboardCardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  headerAction?: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  icon,
  children,
  className,
  headerAction,
}) => {
  return (
    <StyledWrapper className={className}>
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            {icon && <span className="card-icon">{icon}</span>}
            <h3>{title}</h3>
          </div>
          {headerAction && <div className="card-action">{headerAction}</div>}
        </div>
        <div className="card-content">
          {children}
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(193, 163, 98, 0.2);
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    height: 100%;
    display: flex;
    flex-direction: column;

    &:hover {
      border-color: rgba(193, 163, 98, 0.4);
      box-shadow: 0 8px 32px rgba(193, 163, 98, 0.1);
      transform: translateY(-2px);
    }
  }

  .card-header {
    padding: 20px;
    border-bottom: 1px solid rgba(193, 163, 98, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .card-title {
    display: flex;
    align-items: center;
    gap: 12px;

    h3 {
      font-size: 18px;
      font-weight: 600;
      color: var(--color-text-primary, #fff);
      margin: 0;
    }
  }

  .card-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-primary, #c1a362);
  }

  .card-action {
    display: flex;
    align-items: center;
  }

  .card-content {
    padding: 20px;
    flex: 1;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(193, 163, 98, 0.3);
      border-radius: 3px;

      &:hover {
        background: rgba(193, 163, 98, 0.5);
      }
    }
  }
`;

export default DashboardCard;
