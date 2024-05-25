import {Plugins, Sortable} from "@shopify/draggable";
import { refreshData, writeData } from "../utils/crud";

function updateTodoPriority(todoId,newPriority) {
    const data = refreshData();
    let activeProjId = data.findIndex( (x) => x.active === true);
    let [activeProjIdInt, todoIdInt] = [parseInt(activeProjId), parseInt(todoId)];
    data[activeProjIdInt].items[todoIdInt].priority = newPriority;
    writeData(data);
}

export default function MultipleContainers() {
    const containers = document.querySelectorAll(".cntr-body");
  
    if (containers.length === 0) {
      return false;
    }

    const sortable = new Sortable(containers, {
        draggable: ".todo-item",
        mirror: {
          constrainDimensions: true,
        },
        plugins: [Plugins.ResizeMirror],
    });
    
    // --- Draggable events --- //
    sortable.on("sortable:start", () => {return});
    sortable.on("sortable:sort", () => {return});
    sortable.on("sortable:sorted", () => {return});
        
    sortable.on("sortable:stop", (evt) => {
        // Update the object priority on drop
        let target = evt.dragEvent.source;
        target.dataset.priority = evt.newContainer.parentNode.dataset.priority;
        updateTodoPriority(target.dataset.id, target.dataset.priority)
        });
    
    return sortable;
};  