import { useState } from 'react';

export const useFavorites = () => {
    const [favorites, setFavorites] = useState(() => {
        const stored = localStorage.getItem('recipeFavorites');
        return stored ? JSON.parse(stored) : [];
    });

    const toggleFavorite = (recipe) => {
        setFavorites((prev) => {
            const isFavorited = prev.some((r) => r.id === recipe.id);
            const updated = isFavorited
                ? prev.filter((r) => r.id !== recipe.id)
                : [...prev, recipe];
            localStorage.setItem('recipeFavorites', JSON.stringify(updated));
            return updated;
        });
    };

    const isFavorite = (recipeId) => favorites.some((r) => r.id === recipeId);

    return { favorites, toggleFavorite, isFavorite };
};
