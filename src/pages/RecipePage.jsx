import recipes from '../data/recipes.json';
import { useState } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { RecipeCard } from '@/components/RecipeCard';
import { useFavorites } from '@/hooks/useFavorites';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

export const RecipePage = () => {
    const [recipeData] = useState(recipes.recipes);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all');
    const { favorites, toggleFavorite, isFavorite } = useFavorites();

    const filteredRecipes = recipeData.filter((recipe) => {
        const query = searchQuery.toLowerCase();
        return (
            recipe.title.toLowerCase().includes(query) ||
            recipe.ingredients.some((ingredient) =>
                ingredient.toLowerCase().includes(query)
            )
        );
    });

    const filteredFavorites = favorites.filter((recipe) => {
        const query = searchQuery.toLowerCase();
        return (
            recipe.title.toLowerCase().includes(query) ||
            recipe.ingredients.some((ingredient) =>
                ingredient.toLowerCase().includes(query)
            )
        );
    });

    const displayedRecipes = activeTab === 'all' ? filteredRecipes : filteredFavorites;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold mb-4">Recipe Box</h1>
            <p className="text-lg text-gray-600 mb-8">Welcome to Recipe Box! Here you can find delicious recipes to try out.</p>

            <SearchBar value={searchQuery} onChange={setSearchQuery} />

            {/* Tabs */}
            <div className="flex gap-2 mb-8">
                <button
                    onClick={() => setActiveTab('all')}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                        activeTab === 'all'
                            ? 'bg-gray-900 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    All Recipes
                </button>
                <button
                    onClick={() => setActiveTab('favorites')}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                        activeTab === 'favorites'
                            ? 'bg-gray-900 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    Favorites {favorites.length > 0 && `(${favorites.length})`}
                </button>
            </div>

            {displayedRecipes.length === 0 ? (
                <p className="text-gray-400 text-sm mt-4">
                    {activeTab === 'favorites' ? 'No favorites saved yet.' : 'No recipes match your search.'}
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 min-w-full px-12">
                    {displayedRecipes.map((recipe) => (
                        <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                            isFavorite={isFavorite(recipe.id)}
                            onToggleFavorite={toggleFavorite}
                            onViewRecipe={setSelectedRecipe}
                        />
                    ))}
                </div>
            )}

            <Dialog open={!!selectedRecipe} onOpenChange={() => setSelectedRecipe(null)}>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">{selectedRecipe?.title}</DialogTitle>
                        <DialogDescription>
                            Category: {selectedRecipe?.category} | Time: {selectedRecipe?.cookingTime} | Servings: {selectedRecipe?.servings}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid grid-cols-1 gap-6 mt-4">
                        <div>
                            <h3 className="font-bold text-lg mb-2">Instructions</h3>
                            <ol className="list-decimal pl-5 space-y-2">
                                {selectedRecipe?.instructions.map((step, i) => (
                                    <li key={i}>{step}</li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
