import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { StickyNote, Plus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardCard from '@/components/ui/dashboard-card';
import { fetchNotes } from '@/utils/apis/noteApis';
import type { Note } from '@/types/note';

const NotesCard = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadRecentNotes();
  }, []);

  const loadRecentNotes = async () => {
    try {
      setLoading(true);
      const data = await fetchNotes({ page: 1, limit: 5 });
      setNotes(data.notes);
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const truncateText = (text: string, maxLength: number = 60) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <DashboardCard
      title="Recent Notes"
      icon={<StickyNote size={20} />}
      headerAction={
        <Link to="/notes">
          <StyledButton>
            <Plus size={16} />
          </StyledButton>
        </Link>
      }
    >
      <StyledContent>
        {loading ? (
          <div className="empty-state">Loading notes...</div>
        ) : notes.length === 0 ? (
          <div className="empty-state">
            <p>No notes yet</p>
            <Link to="/notes" className="create-link">
              Create your first note
            </Link>
          </div>
        ) : (
          <div className="notes-list">
            {notes.map((note) => (
              <Link to="/notes" key={note._id} className="note-item">
                <div className="note-content">
                  <h4 className="note-title">{truncateText(note.title, 30)}</h4>
                  <p className="note-preview">{truncateText(note.content, 50)}</p>
                </div>
                <div className="note-date">
                  {note.createdAt
                    ? new Date(note.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })
                    : ''}
                </div>
              </Link>
            ))}
            <Link to="/notes" className="view-all">
              View all notes
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </StyledContent>
    </DashboardCard>
  );
};

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: rgba(193, 163, 98, 0.1);
  border: 1px solid rgba(193, 163, 98, 0.3);
  border-radius: 8px;
  color: var(--color-primary, #c1a362);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(193, 163, 98, 0.2);
    border-color: var(--color-primary, #c1a362);
    transform: scale(1.05);
  }
`;

const StyledContent = styled.div`
  .empty-state {
    text-align: center;
    padding: 40px 20px;
    color: var(--color-text-secondary, #9ca3af);

    p {
      margin-bottom: 12px;
    }

    .create-link {
      color: var(--color-primary, #c1a362);
      text-decoration: none;
      font-size: 14px;
      transition: opacity 0.2s;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  .notes-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .note-item {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    padding: 12px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(193, 163, 98, 0.1);
    border-radius: 8px;
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(193, 163, 98, 0.3);
      transform: translateX(4px);
    }
  }

  .note-content {
    flex: 1;
    min-width: 0;
  }

  .note-title {
    font-size: 14px;
    font-weight: 600;
    color: var(--color-text-primary, #fff);
    margin: 0 0 4px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .note-preview {
    font-size: 12px;
    color: var(--color-text-secondary, #9ca3af);
    margin: 0;
    line-height: 1.4;
  }

  .note-date {
    font-size: 11px;
    color: var(--color-text-secondary, #9ca3af);
    white-space: nowrap;
    flex-shrink: 0;
  }

  .view-all {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 10px;
    margin-top: 8px;
    color: var(--color-primary, #c1a362);
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    border-radius: 8px;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(193, 163, 98, 0.1);
    }
  }
`;

export default NotesCard;
