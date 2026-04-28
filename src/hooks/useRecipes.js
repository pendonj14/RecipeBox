import { useState } from 'react';
import initialRecipes from '../data/recipes.json';

export const useRecipes = () => {
    const [customRecipes, setCustomRecipes] = useState(() => {
        const stored = localStorage.getItem('customRecipes');
        return stored ? JSON.parse(stored) : [];
    });

    const allRecipes = [...initialRecipes.recipes, ...customRecipes];

    const addRecipe = (recipeData) => {
        const newRecipe = {
            ...recipeData,
            id: Date.now().toString(),
            isCustom: true,
        };
        setCustomRecipes((prev) => {
            const updated = [...prev, newRecipe];
            localStorage.setItem('customRecipes', JSON.stringify(updated));
            return updated;
        });
    };

    const deleteRecipe = (recipeId) => {
        setCustomRecipes((prev) => {
            const updated = prev.filter((r) => r.id !== recipeId);
            localStorage.setItem('customRecipes', JSON.stringify(updated));
            return updated;
        });
    };

    return { allRecipes, addRecipe, deleteRecipe };
};
