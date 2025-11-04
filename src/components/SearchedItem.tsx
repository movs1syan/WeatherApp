import React from 'react';

interface Props {
  list: Record<string, any>[],
  item: Record<string, any>,
  onAdd: (item: Record<string, any>) => void,
}

const SearchedItem: React.FC<Props> = ({ list, item, onAdd }) => {
  const exists = list.some(fav => fav.name === item.name && fav.country === item.country);
  return (
    <button
      className={`flex gap-3 items-center py-2 px-3 rounded-md border-2
      ${exists ? "border-blue-500 bg-gray-300 text-blue-500" : "bg-blue-500 text-white cursor-pointer active:bg-blue-700"}`}
      onClick={() => !exists && onAdd(item)}
    >
      {exists ? "Added" : "Add"}
    </button>
  );
};

export default SearchedItem;