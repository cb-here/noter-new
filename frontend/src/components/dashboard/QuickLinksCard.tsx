import { useState } from 'react';
import styled from 'styled-components';
import { Link2, ExternalLink, Plus, X } from 'lucide-react';
import DashboardCard from '@/components/ui/dashboard-card';

interface QuickLink {
  id: string;
  title: string;
  url: string;
}

const QuickLinksCard = () => {
  const [links, setLinks] = useState<QuickLink[]>([
    { id: '1', title: 'Google', url: 'https://google.com' },
    { id: '2', title: 'GitHub', url: 'https://github.com' },
    { id: '3', title: 'ChatGPT', url: 'https://chat.openai.com' },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLink, setNewLink] = useState({ title: '', url: '' });

  const handleAddLink = () => {
    if (newLink.title.trim() && newLink.url.trim()) {
      const link: QuickLink = {
        id: Date.now().toString(),
        title: newLink.title,
        url: newLink.url.startsWith('http') ? newLink.url : `https://${newLink.url}`,
      };
      setLinks([...links, link]);
      setNewLink({ title: '', url: '' });
      setShowAddForm(false);
    }
  };

  const handleRemoveLink = (id: string) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  const getDomain = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return domain.replace('www.', '');
    } catch {
      return url;
    }
  };

  return (
    <DashboardCard
      title="Quick Links"
      icon={<Link2 size={20} />}
      headerAction={
        <StyledButton onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? <X size={16} /> : <Plus size={16} />}
        </StyledButton>
      }
    >
      <StyledContent>
        {showAddForm && (
          <div className="add-form">
            <input
              type="text"
              placeholder="Link title"
              value={newLink.title}
              onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
              className="form-input"
            />
            <input
              type="text"
              placeholder="URL (e.g., google.com)"
              value={newLink.url}
              onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
              className="form-input"
            />
            <button onClick={handleAddLink} className="add-btn">
              Add Link
            </button>
          </div>
        )}

        <div className="links-list">
          {links.length === 0 ? (
            <div className="empty-state">
              <p>No quick links yet</p>
              <button onClick={() => setShowAddForm(true)} className="empty-add-btn">
                Add your first link
              </button>
            </div>
          ) : (
            links.map((link) => (
              <div key={link.id} className="link-item">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-content"
                >
                  <div className="link-info">
                    <div className="link-title">{link.title}</div>
                    <div className="link-url">{getDomain(link.url)}</div>
                  </div>
                  <ExternalLink size={16} className="link-icon" />
                </a>
                <button
                  onClick={() => handleRemoveLink(link.id)}
                  className="remove-btn"
                  aria-label="Remove link"
                >
                  <X size={14} />
                </button>
              </div>
            ))
          )}
        </div>
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
  .add-form {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 16px;
    padding: 12px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(193, 163, 98, 0.2);
    border-radius: 8px;
  }

  .form-input {
    padding: 8px 12px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(193, 163, 98, 0.2);
    border-radius: 6px;
    color: var(--color-text-primary, #fff);
    font-size: 14px;
    font-family: inherit;
    outline: none;
    transition: all 0.2s ease;

    &::placeholder {
      color: var(--color-text-secondary, #9ca3af);
    }

    &:focus {
      border-color: var(--color-primary, #c1a362);
      background: rgba(255, 255, 255, 0.08);
    }
  }

  .add-btn {
    padding: 8px 16px;
    background: var(--color-primary, #c1a362);
    color: #212121;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      opacity: 0.9;
      transform: translateY(-1px);
    }
  }

  .links-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .empty-state {
    text-align: center;
    padding: 40px 20px;
    color: var(--color-text-secondary, #9ca3af);

    p {
      margin-bottom: 12px;
    }

    .empty-add-btn {
      color: var(--color-primary, #c1a362);
      background: transparent;
      border: none;
      font-size: 14px;
      cursor: pointer;
      transition: opacity 0.2s;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  .link-item {
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(193, 163, 98, 0.1);
    border-radius: 8px;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(193, 163, 98, 0.3);

      .remove-btn {
        opacity: 1;
      }
    }
  }

  .link-content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-decoration: none;
    min-width: 0;
  }

  .link-info {
    flex: 1;
    min-width: 0;
  }

  .link-title {
    font-size: 14px;
    font-weight: 500;
    color: var(--color-text-primary, #fff);
    margin-bottom: 2px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .link-url {
    font-size: 12px;
    color: var(--color-text-secondary, #9ca3af);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .link-icon {
    color: var(--color-primary, #c1a362);
    flex-shrink: 0;
  }

  .remove-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: 4px;
    color: rgb(239, 68, 68);
    cursor: pointer;
    opacity: 0;
    transition: all 0.2s ease;
    flex-shrink: 0;

    &:hover {
      background: rgba(239, 68, 68, 0.2);
      transform: scale(1.1);
    }
  }
`;

export default QuickLinksCard;
