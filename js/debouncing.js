// To rate limit api calls

let counter = 1;

const getData = () => {
  // calls an api and gets data
  console.log("fetching data...", counter++);
}

const debounce = function (fn, delay) {
  let timer;
  return function () {
    let context = this;
    let args = arguments;

    // When this method is called the previous timer is cleared only then again created below
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  }

}

const debouncedFunction = debounce(getData, 300);