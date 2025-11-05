import React, { useRef, useEffect, useState } from 'react';

// ContextMenu
// - items: [{ label, onClick, icon?, iconColor?, iconBg?, labelColor? }]
// - position: { x, y }
// - header: { title, subtitle } optional
// - onOutsideClick: callback to close
const ContextMenu = ({ items = [], position, header = null, onOutsideClick }) => {
  const menuRef = useRef(null);
  const [pos, setPos] = useState(position)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onOutsideClick && onOutsideClick()
      }
    }

    const handleEsc = (e) => {
      if (e.key === 'Escape') onOutsideClick && onOutsideClick()
    }

    if (position) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEsc)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
        document.removeEventListener('keydown', handleEsc)
      }
    }
  }, [position, onOutsideClick])

  useEffect(() => {
    // update pos when position changes
    setPos(position)
  }, [position])

  // if no position, don't render
  if (!pos) return null;

  const style = {
    top: pos.y,
    left: pos.x,
  }

  return (
    <div
      ref={menuRef}
      className="fixed z-50 bg-white border border-gray-100 rounded-lg shadow-xl text-sm w-56 overflow-hidden"
      style={style}
    >
      {header && (
        <div className="px-4 py-3 border-b border-gray-100 bg-white">
          <div className="font-medium text-gray-900">{header.title}</div>
          {header.subtitle && <div className="text-xs text-gray-500">{header.subtitle}</div>}
        </div>
      )}

      <ul className="py-1">
        {items.map((item, index) => (
          <li
            key={index}
            onClick={(e) => {
              e.stopPropagation()
              item.onClick && item.onClick()
              onOutsideClick && onOutsideClick()
            }}
            className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-3"
          >
            {item.icon && (
              <div className={`w-5 h-5 flex items-center justify-center ${item.iconBg || ''}`}>
                <item.icon className={`w-4 h-4 ${item.iconColor || 'text-gray-600'}`} />
              </div>
            )}
            <span className={`${item.labelColor || 'text-gray-700'} text-sm`}>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContextMenu;
