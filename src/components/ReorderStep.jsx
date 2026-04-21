import { useEffect, useState } from "react";
import {
  DndContext, closestCenter, KeyboardSensor, PointerSensor,
  useSensor, useSensors
} from "@dnd-kit/core";
import {
  arrayMove, SortableContext, sortableKeyboardCoordinates,
  useSortable, verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./ReorderStep.css";

function SortableRow({ option, position }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: option.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="sjs-reorder-row"
      {...attributes}
      {...listeners}
    >
      <div className="sjs-reorder-pos">{position}</div>
      <div className="sjs-reorder-text">{option.text}</div>
    </div>
  );
}

export default function ReorderStep({ step, answer, onChange }) {
  const initialOrder = answer?.value || step.options.map(o => o.id);
  const [order, setOrder] = useState(initialOrder);

  useEffect(() => {
    // Sync out once on mount so an un-dragged answer is still recorded on advance
    onChange(order);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const byId = Object.fromEntries(step.options.map(o => [o.id, o]));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIdx = order.indexOf(active.id);
    const newIdx = order.indexOf(over.id);
    const next = arrayMove(order, oldIdx, newIdx);
    setOrder(next);
    onChange(next);
  };

  return (
    <div>
      <p className="sjs-prompt">{step.prompt}</p>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={order} strategy={verticalListSortingStrategy}>
          <div className="sjs-reorder-list">
            {order.map((id, idx) => (
              <SortableRow key={id} option={byId[id]} position={idx + 1} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
