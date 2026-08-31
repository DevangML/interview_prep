// Performance optimization or rate limiting the function execution

// After first function call throttling delays next call by a delay

let counter = 0;

const button = document.getElementById("btn2");

const expensive = () => {
  console.log("Expensive Method: ", counter++)
}

const throttle = (func, limit) => {
  let allow = true;

  return function () {
    let context = this;
    let args = arguments;
    if (allow) {
      func.apply(context, args);
      allow = false;

      setTimeout(() => {
        allow = true;
      }, limit)
    }
  }
}

const betterExpensive = throttle(expensive, 1000);

button.addEventListener('click', betterExpensive);