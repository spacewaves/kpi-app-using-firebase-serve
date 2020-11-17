const auth = firebase.auth();

const whenSignedIn = document.getElementById("whenSignedIn");
const whenSignedOut = document.getElementById("whenSignedOut");

const signInBtn = document.getElementById("signInBtn");
const signOutBtn = document.getElementById("signOutBtn");

const userDetails = document.getElementById("userDetails");

const provider = new firebase.auth.GoogleAuthProvider();

signInBtn.onclick = () => {
  auth.signInWithPopup(provider);
  thingsList.style.display = "block";
};
signOutBtn.onclick = () => {
  auth.signOut();
  thingsList.style.display = "none";
};

auth.onAuthStateChanged((user) => {
  if (user) {
    whenSignedIn.hidden = false;
    whenSignedOut.hidden = true;
    userDetails.innerHTML = `<h3>Hello ${user.displayName}</h3><p>User ID: ${user.uid}</p>`;
    // Display List on UI
    function displayList() {
      const db = firebase.firestore();
      db.collection("things")
        .orderBy("created_at", "desc")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            createElementList(doc);
          });
        });
    }
    deleteList();
    displayList();
  } else {
    whenSignedIn.hidden = true;
    whenSignedOut.hidden = false;
    userDetails.innerHTML = "";
  }
});

// Make a list
thingsList = document.getElementById("myList");
function createElementList(doc) {
  let li = document.createElement("LI");
  let taskName = document.createElement("span");
  let quantity = document.createElement("span");
  let date = document.createElement("span");
  let daysToDeadline = document.createElement("span");
  let cross = document.createElement("div");

  li.setAttribute("data-id", doc.id);
  console.log(li.setAttribute("data-id", doc.id));
  taskName.textContent = doc.data().taskName;
  quantity.textContent = doc.data().quantity;
  date.textContent = doc.data().date;
  cross.textContent = "x";

  // Calculate days to deadline
  var today = new Date();
  daysToDeadline.textContent = Math.floor(
    (new Date(doc.data().date).getTime() - today.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  // Create text node
  const formattedText = `${doc.data().taskName} => ${quantity.innerHTML} by ${
    date.innerHTML
  } ||  ${daysToDeadline.innerHTML} days remaining  `;
  let textNode = document.createTextNode(formattedText);

  cross.addEventListener("click", (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute("data-id");
    db.collection("things").doc(id).delete();
    li.remove(id);
  });

  // Add text node to list items
  li.appendChild(textNode);
  li.appendChild(cross);

  // Add list items and delete button to list
  thingsList.appendChild(li);
}

// Get Input fields
const getInputFieldsValues = () => {
  var taskName = document.getElementById("task").value;
  var quantity = document.getElementById("quantity").value;
  var date = document.getElementById("deadline").value;

  return { taskName, quantity, date };
};

const handleClick = (item) => {
  const { taskName, quantity, date } = getInputFieldsValues(item);

  const db = firebase.firestore();
  thingsList = document.getElementById("myList");
  let thingsRef;
  thingsRef = db.collection("things");

  // add input field values to firebase
  thingsRef.add({
    taskName: taskName,
    quantity: quantity,
    date: date,
    created_at: Date.now(),
  });
  deleteList();
  displayList();
};
// add button
const addButton = document.getElementById("myBtn");
addButton.addEventListener("click", handleClick);

const deleteListButton = document.createElement("button");

// block
const deleteList = () => {
  thingsList.remove();
  thingsList = document.createElement("ul");
  thingsList.id = "myList";
  document.getElementById("root").appendChild(thingsList);
};

deleteListButton.addEventListener("click", deleteList);
