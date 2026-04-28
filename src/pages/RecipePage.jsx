import recipes from '../data/recipes.json';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
// 1. Import the Dialog components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

export const RecipePage = () => {
    const [recipeData, setRecipeData] = useState([]);
    // 2. Create a state to track which recipe was clicked
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    useEffect(() => {
        setRecipeData(recipes.recipes);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold mb-4">Recipe Page</h1>
            <p className="text-lg text-gray-600 mb-8">Welcome to the recipe page! Here you can find delicious recipes to try out.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 min-w-full px-12">
                {recipeData.map((recipe) => (
                     <Card key={recipe.id} className="relative mx-auto w-full max-w-sm pt-0 overflow-hidden">
                        <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
                        <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
                        />
                        <CardHeader>
                            <CardAction>
                                <Badge variant="secondary">{recipe.category}</Badge>
                            </CardAction>
                            <CardTitle>{recipe.title}</CardTitle>
                            <CardDescription>
                                Good for {recipe.servings} servings. Takes {recipe.cookingTime} to cook.
                            </CardDescription>
                        </CardHeader>
                        <CardFooter>
                            {/* 3. When clicked, set this specific recipe to state */}
                            <Button className="w-full" onClick={() => setSelectedRecipe(recipe)}>
                                View Recipe
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* 4. The Dialog Modal */}
            {/* It opens only when selectedRecipe is NOT null */}
            <Dialog open={!!selectedRecipe} onOpenChange={() => setSelectedRecipe(null)}>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    {/* We use selectedRecipe?. to safely check if it exists before rendering */}
                    <DialogHeader>
                        <DialogTitle className="text-2xl">{selectedRecipe?.title}</DialogTitle>
                        <DialogDescription>
                            Category: {selectedRecipe?.category} | Time: {selectedRecipe?.cookingTime} | Servings: {selectedRecipe?.servings}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        {/* Ingredients Section */}
                        <div>
                            <h3 className="font-bold text-lg mb-2">Ingredients</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                {selectedRecipe?.ingredients.map((ingredient, i) => (
                                    <li key={i}>{ingredient}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Instructions Section */}
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