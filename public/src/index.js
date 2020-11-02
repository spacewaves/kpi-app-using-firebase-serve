thingsList = document.getElementById("myList");

function renderCafe(doc) {
  let li = document.createElement("LI");
  let taskName = document.createElement("span");
  let quantity = document.createElement("span");
  let date = document.createElement("span");
  let daysToDeadline = document.createElement("span");
  li.setAttribute("data-id", doc.id);
  taskName.textContent = doc.data().taskName;
  quantity.textContent = doc.data().quantity;
  date.textContent = doc.data().date;

  var today = new Date();
  daysToDeadline.textContent = Math.floor(
    (new Date(doc.data().date).getTime() - today.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const formattedText = `${taskName.innerHTML} => ${quantity.innerHTML} by ${date.innerHTML} ||  ${daysToDeadline.innerHTML} days remaining  `;

  let textNode = document.createTextNode(formattedText);

  li.appendChild(textNode);
  console.log(li);
  thingsList.appendChild(li);
}

const db = firebase.firestore();
db.collection("things")
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      renderCafe(doc);
    });
  });

const addTaskToServer = (task) => {
  // some code to add task
  myTasks.push(task);
};

const getInputFieldsValues = () => {
  var taskName = document.getElementById("task").value;
  var quantity = document.getElementById("quantity").value;
  var date = document.getElementById("deadline").value;

  return { taskName, quantity, date };
};

const handleClick = (item) => {
  const { taskName, quantity, date } = getInputFieldsValues(item);

  // // POST task to server
  // addTaskToServer({ taskName, quantity, date });
  // let addedTasks = getMyTasks();
  // let lastTaskAdded = addedTasks[addedTasks.length - 1];
  // updateUI(lastTaskAdded);

  console.log(getInputFieldsValues(item).date);

  const db = firebase.firestore();
  thingsList = document.getElementById("myList");
  let thingsRef;
  thingsRef = db.collection("things");

  thingsRef.add({
    taskName: taskName,
    quantity: quantity,
    date: date,
  });

  var today = new Date();
  item.daysToDeadline = Math.floor(
    (new Date(getInputFieldsValues(item).date).getTime() - today.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  var z = document.createElement("LI"); // is a node
  z.innerHTML = `${taskName} => ${quantity} by ${date} ||  ${item.daysToDeadline} days remaining `;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "remove";
  deleteButton.onclick = () => z.remove();

  thingsList.appendChild(z);
  thingsList.appendChild(deleteButton);
};

const addButton = document.getElementById("myBtn");
addButton.addEventListener("click", handleClick);
