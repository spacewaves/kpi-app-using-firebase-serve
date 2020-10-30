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

  console.log(taskName);
  li.appendChild(taskName);
  li.appendChild(quantity);
  li.appendChild(date);
  li.appendChild(daysToDeadline);

  const formattedText = `${taskName} => ${quantity} by ${date} ||  ${daysToDeadline} days remaining `;
  const textNode = document.createTextNode(formattedText);
  console.log(textNode);
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

  // // POST task to server
  // addTaskToServer({ taskName, quantity, date });
  // let addedTasks = getMyTasks();
  // let lastTaskAdded = addedTasks[addedTasks.length - 1];

  // updateUI(lastTaskAdded);

  const db = firebase.firestore();

  thingsList = document.getElementById("myList");

  let thingsRef;
  let unsubscribe;
  thingsRef = db.collection("things");

  thingsRef.add({
    taskName: taskName,
    quantity: quantity,
    date: date,
  });

  unsubscribe = thingsRef.onSnapshot((querySnapshot) => {
    const items = querySnapshot.docs.map((doc) => {
      return `<li>${doc.data().taskName}</li>`;
    });

    thingsList.innerHTML = items.join("");
  });
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

auth.onAuthStateChanged((user) => {
  if (user) {
    whenSignedIn.hidden = false;
    whenSignedOut.hidden = true;
    userDetails.innerHTML = `<h3>Hello ${user.displayName}!</h3> <p>User ID: ${user.uid}</p>`;
  } else {
    // not signed in
    whenSignedIn.hidden = true;
    whenSignedOut.hidden = false;
    userDetails.innerHTML = "";
  }
});

///// Firestore /////
