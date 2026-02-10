import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronIcon } from './icons/ChevronIcon';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-400 flex-wrap">
        <li>
          <Link
            to="/home"
            className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 rounded px-1"
          >
            홈
          </Link>
        </li>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <li aria-hidden="true" className="flex items-center">
              <ChevronIcon className="w-3 h-3 text-neutral-400" />
            </li>
            <li>
              {item.path ? (
                <Link
                  to={item.path}
                  className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 rounded px-1"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-neutral-700 dark:text-neutral-300 font-medium px-1">
                  {item.label}
                </span>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
