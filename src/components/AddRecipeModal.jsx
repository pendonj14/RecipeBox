import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog';

const EMPTY_FORM = {
    title: '',
    category: '',
    image: '',
    cookingTime: '',
    servings: '',
    ingredients: '',
    instructions: '',
};

const inputClass =
    'w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400';

export const AddRecipeModal = ({ open, onClose, onAdd }) => {
    const [form, setForm] = useState(EMPTY_FORM);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.title.trim() || !form.ingredients.trim() || !form.instructions.trim()) {
            setError('Title, ingredients, and instructions are required.');
            return;
        }
        onAdd({
            title: form.title.trim(),
            category: form.category.trim() || 'Custom',
            image: form.image.trim() ||
                'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&q=80',
            cookingTime: form.cookingTime.trim() || '—',
            servings: Number(form.servings) || 1,
            ingredients: form.ingredients.split('\n').map((s) => s.trim()).filter(Boolean),
            instructions: form.instructions.split('\n').map((s) => s.trim()).filter(Boolean),
        });
        setForm(EMPTY_FORM);
        setError('');
        onClose();
    };

    const handleOpenChange = (isOpen) => {
        if (!isOpen) {
            setForm(EMPTY_FORM);
            setError('');
            onClose();
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl">Add New Recipe</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Title *</label>
                        <input name="title" value={form.title} onChange={handleChange}
                            placeholder="e.g. Garlic Bread" className={inputClass} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-700">Category</label>
                            <input name="category" value={form.category} onChange={handleChange}
                                placeholder="e.g. Bread" className={inputClass} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-700">Cooking Time</label>
                            <input name="cookingTime" value={form.cookingTime} onChange={handleChange}
                                placeholder="e.g. 20M" className={inputClass} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-700">Servings</label>
                            <input name="servings" type="number" min="1" value={form.servings}
                                onChange={handleChange} placeholder="e.g. 4" className={inputClass} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-700">Image URL</label>
                            <input name="image" value={form.image} onChange={handleChange}
                                placeholder="https://..." className={inputClass} />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">
                            Ingredients * <span className="text-gray-400 font-normal">(one per line)</span>
                        </label>
                        <textarea name="ingredients" value={form.ingredients} onChange={handleChange}
                            rows={4} placeholder={"200g flour\n2 eggs\n1 cup milk"}
                            className={`${inputClass} resize-none`} />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">
                            Instructions * <span className="text-gray-400 font-normal">(one per line)</span>
                        </label>
                        <textarea name="instructions" value={form.instructions} onChange={handleChange}
                            rows={4} placeholder={"Preheat oven to 180°C.\nMix ingredients.\nBake for 20 minutes."}
                            className={`${inputClass} resize-none`} />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Add Recipe</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
