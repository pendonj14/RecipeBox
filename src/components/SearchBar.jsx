export const SearchBar = ({ value, onChange }) => {
    return (
        <div className="w-full max-w-md mb-8">
            <input
                type="text"
                placeholder="Search by name or ingredient..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm"
            />
        </div>
    );
};
