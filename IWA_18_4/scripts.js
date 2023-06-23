/**
 * A handler that fires when a user drags over any element inside a column. In
 * order to determine which column the user is dragging over the entire event
 * bubble path is checked with `event.path` (or `event.composedPath()` for
 * browsers that don't support `event.path`). The bubbling path is looped over
 * until an element with a `data-area` attribute is found. Once found both the
 * active dragging column is set in the `state` object in "data.js" and the HTML
 * is updated to reflect the new column.
 *
 * @param {Event} event
 */
const handleDragOver = (event) => {
    event.preventDefault();
    const path = event.path || event.composedPath();
    let column = null;
  
    for (const element of path) {
      const { area } = element.dataset;
      if (area) {
        column = area;
        break;
      }
    }
  
    if (!column) return;
    updateDragging({ over: column });
    updateDraggingHtml({ over: column });
  };
  
const handlerHelpToggle = document.querySelector('[data-help]');
const helpOverlay = document.querySelector('[data-help-overlay]');
const helpCancelButton = document.querySelector('[data-help-cancel]');

handlerHelpToggle.addEventListener('click', () => {
    helpOverlay.showModal();
});

helpCancelButton.addEventListener('click', () => {
    helpOverlay.close();
    html.other.add.focus()
});

const handlerAddToggle = document.querySelector('[data-add]');
const addOverlay = document.querySelector('[data-add-overlay]');
const addCancelButton = document.querySelector('[data-add-cancel]');
const addForm = document.querySelector('[data-add-form]');
const orderText = document.querySelector('[data-order-text]');
const associatedTable = document.querySelector('[data-associated-table]');

handlerAddToggle.addEventListener('click', () => {
addOverlay.showModal()});
html.other.add.focus()


addCancelButton.addEventListener('click', () => {
   event.preventDefault();
    addOverlay.close()
});



addForm.addEventListener('submit', (event) => {
    event.preventDefault();
    handleAddSubmit();
});

const openAddOrderOverlay = () => {
    addOverlay.showModal();
    orderText.value = '';
    associatedTable.value = '';
    orderText.focus();
};

const closeAddOrderOverlay = () => {
    addOverlay.close();
    focusAddOrderButton();
};

const handleAddSubmit = (event) => {
    event.preventDefault();
  
    const title = html.add.title.value;
    const table = html.add.table.value;
  
    const newOrder = createOrderData({ title, table });
  
    state.orders[newOrder.id] = newOrder;
  
    const orderElement = createOrderHtml(newOrder);
  
    html.columns.ordered.appendChild(orderElement);
  
    handleAddToggle.close();
  
    html.add.title.value = '';
    html.add.table.value = '';
  };
  html.add.form.addEventListener('submit', handleAddSubmit);

  
  
  const handleEditToggle = (event) => {
    const orderId = event.target.dataset.id;
    const order = state.orders[orderId];
  
    if (html.edit.overlay.classList.contains('active')) {

      html.edit.overlay.classList.remove('active');
    } else {
      html.edit.overlay.classList.add('active');
      html.edit.title.value = order.title;
      html.edit.table.value = order.table;
      html.edit.id.value = orderId;
      html.edit.column.value = order.column;
      html.edit.title.focus();
    }
  };
  
  for (const orderElement of document.querySelectorAll('.order')) {
    orderElement.addEventListener('click', handleEditToggle);
  }
  
  html.edit.cancel.addEventListener('click', handleEditToggle);
editCancelButton.addEventListener('click', () => {
    closeEditOrderOverlay();
});

editForm.addEventListener('submit', (event) => {
    event.preventDefault();
    handleEditSubmit();
});

editDeleteButton.addEventListener('click', () => {
    handleDelete();
});

const openEditOrderOverlay = () => {
    editOverlay.showModal();
};

const closeEditOrderOverlay = () => {
    editOverlay.close();
};

const handleEditSubmit = () => {
    const updatedOrder = {
    };


    closeEditOrderOverlay();
};

const handleDelete = (event) => {
    event.preventDefault();
    
    const orderId = html.edit.id.value;
    const orderElement = document.querySelector(`[data-id="${orderId}"]`);
  
    if (orderElement) {
      orderElement.remove();
    }
    
    handleEditToggle();
  };
  

const focusAddOrderButton = () => {
    addOrderButton.focus();
};