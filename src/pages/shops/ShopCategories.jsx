import React, { useState } from 'react';
import CategoryList from './shop_categories_widgets/CategoryList';
import ShopTable from './shop_categories_widgets/ShopTable';

const ShopCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState('Music');

  // Mock data for shops
  const mockShops = [
    {
      name: 'Marika Haloga',
      products: 32,
      ownerImage: '/celebratinglogo.png',
      createdAt: '28-02-2000',
      country: 'KE',
      salesVolume: '32,000',
      orderVolume: '32,000',
      followers: '32,000',
      rating: '4.5',
      trend: 'up'
    },
    {
      name: 'Cham Thum',
      products: 32,
      ownerImage: '/celebratinglogo.png',
      createdAt: '28-02-2000',
      country: 'KE',
      salesVolume: '23,000',
      orderVolume: '23,000',
      followers: '23,000',
      rating: '4.3',
      trend: 'down'
    },
    {
      name: 'Paward Chung',
      products: 32,
      ownerImage: '/celebratinglogo.png',
      createdAt: '28-02-2000',
      country: 'KE',
      salesVolume: '23,000',
      orderVolume: '23,000',
      followers: '23,000',
      rating: '4.3',
      trend: 'down'
    },
    {
      name: 'Hang Turm',
      products: 32,
      ownerImage: '/celebratinglogo.png',
      createdAt: '28-02-2000',
      country: 'KE',
      salesVolume: '23,000',
      orderVolume: '23,000',
      followers: '23,000',
      rating: '4.3',
      trend: 'up'
    },
    {
      name: 'Hankue Hue',
      products: 32,
      ownerImage: '/celebratinglogo.png',
      createdAt: '28-02-2000',
      country: 'KE',
      salesVolume: '23,000',
      orderVolume: '23,000',
      followers: '23,000',
      rating: '4.3',
      trend: 'down'
    }
  ];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Shop Categories</h1>
        <p className="text-gray-600 mt-1">Browse shops organized by categories and product types</p>
      </div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">All Categories</h2>
        <CategoryList
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />
      </div>

      {/* Shop Table */}
      <ShopTable shops={mockShops} category={selectedCategory} />
    </div>
  );
};

export default ShopCategories;