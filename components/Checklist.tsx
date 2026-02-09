import React, { useState, useEffect } from 'react';

interface ChecklistProps {
  sectionKey: string;
  items: string[];
}

const Checklist: React.FC<ChecklistProps> = ({ sectionKey, items }) => {
  const storageKey = `checklist-${sectionKey}`;

  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(checkedItems));
  }, [checkedItems, storageKey]);

  const toggleItem = (index: number) => {
    setCheckedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const progress = items.length > 0 ? (completedCount / items.length) * 100 : 0;

  return (
    <div className="my-6">
      {/* Progress bar */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-orange-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
          {completedCount}/{items.length} 완료
        </span>
      </div>

      {/* Checklist items */}
      <div className="space-y-2">
        {items.map((item, i) => (
          <label
            key={i}
            className={`flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-neutral-700 transition-colors ${
              checkedItems[i] ? 'opacity-60' : ''
            }`}
          >
            <input
              type="checkbox"
              checked={checkedItems[i] || false}
              onChange={() => toggleItem(i)}
              className="w-4 h-4 rounded accent-orange-600"
            />
            <span className={`text-sm ${checkedItems[i] ? 'line-through text-neutral-400' : ''}`}>
              {item}
            </span>
          </label>
        ))}
      </div>

      {/* Reset button */}
      {completedCount > 0 && (
        <button
          onClick={() => setCheckedItems({})}
          className="mt-3 text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
        >
          초기화
        </button>
      )}
    </div>
  );
};

export default Checklist;
