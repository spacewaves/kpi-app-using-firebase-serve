import { myTasks } from "./data";

export const getMyTasks = () => {
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

export const addTaskToServer = (task) => {
  // some code to add task
  myTasks.push(task);
};
