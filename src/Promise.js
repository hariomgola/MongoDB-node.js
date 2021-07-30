// callback function
const callbackFunction = (callback) => {
  setTimeout(() => {
    callback(undefined, [1, 1, 0, 0]);
  }, 2000);
};

callbackFunction((error, result) => {
  if (error) {
    return console.log(error);
  }
  console.log(result);
});

// promises
const promiseFunction = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("Promise Failed.....");
  }, 2000);
});

promiseFunction
  .then((result) => {
    console.log("Success!", result);
  })
  .catch((error) => {
    console.log("Error!", error);
  });
