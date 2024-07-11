import React, { useState, useRef } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PropTypes from 'prop-types';
import './SortableList.css'; // Import the CSS file

const ItemType = 'SORTABLE_ITEM';

const SortableItem = ({ item, index, moveItem, renderItem }) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: ItemType,
    hover(draggedItem) {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`sortable-item ${isDragging ? 'dragging' : ''}`}
    >
      {renderItem(item)}
    </div>
  );
};

SortableItem.propTypes = {
  item: PropTypes.any.isRequired,
  index: PropTypes.number.isRequired,
  moveItem: PropTypes.func.isRequired,
  renderItem: PropTypes.func.isRequired,
};

const SortableList = ({ items, renderItem }) => {
  const [currentItems, setCurrentItems] = useState(items);

  const moveItem = (fromIndex, toIndex) => {
    const updatedItems = [...currentItems];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setCurrentItems(updatedItems);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="sortable-list">
        {currentItems.map((item, index) => (
          <SortableItem
            key={item.id || item}
            index={index}
            item={item}
            moveItem={moveItem}
            renderItem={renderItem}
          />
        ))}
      </div>
    </DndProvider>
  );
};

SortableList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  renderItem: PropTypes.func.isRequired,
};

export default SortableList;
