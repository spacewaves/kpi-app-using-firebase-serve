const myTasks = [
  {
    taskName: "contact clients",
    quantity: "5",
    date: "10/04/2500",
  },
  {
    taskName: "make cakes",
    quantity: "100",
    date: "10/04/2200",
  },
  {
    taskName: "get pizza",
    quantity: "3000",
    date: "10/11/11100",
  },
];
const addTaskToServer = (task) => {
  // some code to add task
  myTasks.push(task);
};
const getMyTasks = () => {
  // you need to use myTasks!!!
  // change coded below
  //
  var today = new Date();

  myTasks.forEach(
    (task) =>
      (task.daysToDeadline = Math.floor(
        (new Date(task.date).getTime() - today.getTime()) /
          (1000 * 60 * 60 * 24)
      ))
  );

  // change code above

  return myTasks;
};

const getInputFieldsValues = () => {
  var taskName = document.getElementById("task").value;
  var quantity = document.getElementById("quantity").value;
  var date = document.getElementById("deadline").value;

  return { taskName, quantity, date };
};

const handleClick = () => {
  const { taskName, quantity, date } = getInputFieldsValues();

  // POST task to server
  addTaskToServer({ taskName, quantity, date });
  let addedTasks = getMyTasks();
  let lastTaskAdded = addedTasks[addedTasks.length - 1];
  console.log(firebase);
  updateUI(lastTaskAdded);
};

const updateUI = (item) => {
  const { taskName, quantity, date } = item;

  var node = document.createElement("LI");

  const formattedText = `${taskName} => ${quantity} by ${date} ||  ${item.daysToDeadline} days remaining `;
  const textNode = document.createTextNode(formattedText);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "remove";
  deleteButton.onclick = () => node.remove();

  node.appendChild(textNode);
  node.appendChild(deleteButton);

  document.getElementById("myList").appendChild(node);
};

const addButton = document.getElementById("myBtn");
addButton.addEventListener("click", handleClick);

let items = getMyTasks();

items.forEach(function (item) {
  updateUI(item);
});

// add a button called show server tasks
var button = document.createElement("button");
button.innerHTML = "Show server tasks";
document.body.appendChild(button);

//const hello = console.log(getMyTasks())
//console.log(hello)

button.addEventListener("click", () => console.log(getMyTasks()));

// change code above
const auth = firebase.auth();

const whenSignedIn = document.getElementById("whenSignedIn");
const whenSignedOut = document.getElementById("whenSignedOut");

const signInBtn = document.getElementById("signInBtn");
const signOutBtn = document.getElementById("signOutBtn");

const userDetails = document.getElementById("userDetails");

const provider = new firebase.auth.GoogleAuthProvider();

signInBtn.onclick = () => auth.signInWithPopup(provider);

signOutBtn.onclick = () => auth.signOut();
