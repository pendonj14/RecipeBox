import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export const RecipeCard = ({ recipe, isFavorite, onToggleFavorite, onViewRecipe }) => {
    return (
        <Card className="relative mx-auto w-full max-w-sm pt-0 overflow-hidden">
            <div className="absolute inset-0 z-30 aspect-video" />
            <button
                onClick={() => onToggleFavorite(recipe)}
                className="absolute top-2 right-2 z-40 bg-white/80 hover:bg-white rounded-full p-1.5 shadow transition-colors"
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
                <Heart
                    size={18}
                    className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}
                />
            </button>
            <img
                src={recipe.image}
                alt={recipe.title}
                className="relative z-20 aspect-video w-full object-cover"
            />
            <CardHeader>
                <CardAction>
                    <Badge variant="secondary">{recipe.category}</Badge>
                </CardAction>
                <CardTitle>{recipe.title}</CardTitle>
                <CardDescription>
                    <div>
                        <h3 className="font-bold text-lg mb-2">Ingredients</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            {recipe.ingredients.map((ingredient, i) => (
                                <li key={i}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <Button className="w-full" onClick={() => onViewRecipe(recipe)}>
                    View Recipe
                </Button>
            </CardFooter>
        </Card>
    );
};
