import React, { useState, useMemo } from 'react';
import { Search, Plus, Filter, Sparkles, X } from 'lucide-react';
import { RoboticComponent } from '../types';
import { ProductCard } from './ProductCard';
import { useStore } from '../context/StoreContext';

interface ProductGridProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onOpenSpecs: (comp: RoboticComponent) => void;
  onAddNewComponent?: () => void;
  onEditComponent?: (comp: RoboticComponent) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  selectedCategory,
  onSelectCategory,
  onOpenSpecs,
  onAddNewComponent,
  onEditComponent
}) => {
  const { components, isOwnerMode } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const categories = [
    { id: 'all', label: 'All Components' },
    { id: 'microcontrollers', label: 'Arduino & Microcontrollers' },
    { id: 'kits', label: 'Robotics Kits' },
    { id: 'cables_wiring', label: 'Cables & Jumper Wires' },
    { id: 'sensors', label: 'Sensors & Sonar' },
    { id: 'motors_actuators', label: 'Motors & Drivers' },
    { id: 'power_modules', label: 'Power & Battery' }
  ];

  const filteredComponents = useMemo(() => {
    return components.filter((comp) => {
      // Category match
      const matchesCategory = selectedCategory === 'all' || comp.category === selectedCategory;

      // Search match
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        comp.title.toLowerCase().includes(q) ||
        comp.shortDescription.toLowerCase().includes(q) ||
        comp.category.toLowerCase().includes(q) ||
        comp.specs.some((s) => s.value.toLowerCase().includes(q) || s.label.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // Default order
    });
  }, [components, selectedCategory, searchQuery, sortBy]);

  return (
    <section id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">
            Component Depot & Lab Inventory
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Robotics Parts & Development Boards
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Fully verified pinouts, compatible logic levels, and high-frequency communication modules for robotics makers.
          </p>
        </div>

        {isOwnerMode && (
          <button
            onClick={onAddNewComponent}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs rounded-lg transition-colors flex items-center gap-2 shrink-0 self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Component</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4 mb-8">
        {/* Top Controls: Search & Sort */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Arduino, cables, sensors, motors, or kits..."
              className="w-full pl-9 pr-9 py-2 text-sm bg-slate-900 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-xs text-slate-400 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              <option value="featured">Featured Order</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Category Segmented Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-slate-100 text-slate-950 font-semibold'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800/80 hover:border-slate-700'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Product Cards */}
      {filteredComponents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredComponents.map((component) => (
            <ProductCard
              key={component.id}
              component={component}
              onOpenSpecs={onOpenSpecs}
              onEdit={onEditComponent}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-16 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-900/30">
          <Filter className="w-8 h-8 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-300">No components match your search</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
            Try adjusting your search query or switching to another category.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              onSelectCategory('all');
            }}
            className="px-4 py-2 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
          >
            Clear Filters & View All
          </button>
        </div>
      )}
    </section>
  );
};
