import React, { useRef, useEffect } from 'react';

const ContextMenu = ({ items, position, onOutsideClick }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onOutsideClick()
      }
    }

    if (position) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [position, onOutsideClick])

  if (!position) return null;

  const menuStyle = {
    top: position.y,
    left: position.x,
  };

  return (
    <div
      ref={menuRef}
      className="fixed z-50 bg-white border border-gray-200 rounded-md shadow-lg text-sm"
      style={menuStyle}
    >
      <ul className="py-1">
        {items.map((item, index) => (
          <li
            key={index}
            onClick={(e) => {
              // Prevent the parent handlers from immediately closing the menu before this click runs
              e.stopPropagation()
              try {
                item.onClick && item.onClick()
              } catch (err) {
                // swallow errors to avoid breaking UI
                // console.error(err)
              }
              onOutsideClick && onOutsideClick()
            }}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
          >
            {item.icon && <item.icon className="w-4 h-4 text-gray-600" />}
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContextMenu;
