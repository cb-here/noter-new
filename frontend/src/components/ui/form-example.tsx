import { useState } from 'react';
import Input from './input';
import Textarea from './textarea';
import Button from './button';

export const FormExample = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const [errors, setErrors] = useState({
    title: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    const newErrors = {
      title: formData.title ? '' : 'Title is required',
      description: formData.description ? '' : 'Description is required',
    };

    setErrors(newErrors);

    if (!newErrors.title && !newErrors.description) {
      console.log('Form submitted:', formData);
      // Handle form submission
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-3xl font-bold text-white mb-8">Create Note</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Note Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          error={errors.title}
        />

        <Textarea
          label="Note Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          error={errors.description}
          rows={6}
        />

        <Button type="submit" variant="primary">
          Create Note
        </Button>
      </form>
    </div>
  );
};
