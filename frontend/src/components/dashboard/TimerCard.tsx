import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Clock, Play, Pause, RotateCcw } from 'lucide-react';
import DashboardCard from '@/components/ui/dashboard-card';

const TimerCard = () => {
  const [time, setTime] = useState(0); // in seconds
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <DashboardCard title="Timer" icon={<Clock size={20} />}>
      <StyledContent>
        <div className="timer-display">
          <div className="time">{formatTime(time)}</div>
          <div className="label">HH:MM:SS</div>
        </div>

        <div className="timer-controls">
          <button
            className="control-btn primary"
            onClick={handlePlayPause}
            aria-label={isRunning ? 'Pause' : 'Start'}
          >
            {isRunning ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button
            className="control-btn secondary"
            onClick={handleReset}
            disabled={time === 0}
            aria-label="Reset"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </StyledContent>
    </DashboardCard>
  );
};

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 20px 0;

  .timer-display {
    text-align: center;
  }

  .time {
    font-size: 48px;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    color: var(--color-primary, #c1a362);
    line-height: 1;
    margin-bottom: 8px;
    letter-spacing: 2px;
  }

  .label {
    font-size: 12px;
    color: var(--color-text-secondary, #9ca3af);
    letter-spacing: 3px;
  }

  .timer-controls {
    display: flex;
    gap: 12px;
  }

  .control-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 50%;
      scale: 0;
      transition: scale 0.4s ease;
    }

    &:hover::before {
      scale: 1;
    }

    &:active {
      transform: scale(0.95);
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;

      &:hover {
        transform: none;
      }

      &:hover::before {
        scale: 0;
      }
    }

    svg {
      position: relative;
      z-index: 1;
    }

    &.primary {
      background: var(--color-primary, #c1a362);
      color: #212121;

      &::before {
        background: #212121;
      }

      &:hover {
        box-shadow: 0 0 20px rgba(193, 163, 98, 0.4);
      }

      &:hover svg {
        color: var(--color-primary, #c1a362);
      }
    }

    &.secondary {
      background: rgba(255, 255, 255, 0.1);
      color: var(--color-text-secondary, #9ca3af);
      border: 1px solid rgba(193, 163, 98, 0.2);

      &::before {
        background: rgba(193, 163, 98, 0.2);
      }

      &:hover {
        color: var(--color-text-primary, #fff);
      }
    }
  }
`;

export default TimerCard;
