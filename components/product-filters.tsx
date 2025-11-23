"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface ProductFiltersProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  tags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  onClearFilters: () => void;
}

export function ProductFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  tags,
  selectedTags,
  onTagToggle,
  onClearFilters,
}: ProductFiltersProps) {
  const hasActiveFilters = selectedCategory !== null || selectedTags.length > 0;

  return (
    <div className="space-y-6 rounded-lg border border-neutral-200 bg-white p-6 shadow-soft">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-neutral-900">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="h-auto p-0 text-xs text-neutral-600 hover:text-neutral-900"
          >
            Clear all
          </Button>
        )}
      </div>

      <div>
        <h4 className="mb-3 text-sm font-medium uppercase tracking-wider text-neutral-600">
          Category
        </h4>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className={`cursor-pointer transition-all ${
                selectedCategory === category
                  ? 'bg-neutral-900 text-white hover:bg-neutral-800'
                  : 'border-neutral-300 hover:border-neutral-900'
              }`}
              onClick={() =>
                onCategoryChange(selectedCategory === category ? null : category)
              }
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-medium uppercase tracking-wider text-neutral-600">
          Tags
        </h4>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? 'default' : 'outline'}
              className={`cursor-pointer transition-all ${
                selectedTags.includes(tag)
                  ? 'bg-neutral-900 text-white hover:bg-neutral-800'
                  : 'border-neutral-300 hover:border-neutral-900'
              }`}
              onClick={() => onTagToggle(tag)}
            >
              {tag}
              {selectedTags.includes(tag) && (
                <X className="ml-1 h-3 w-3" />
              )}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
