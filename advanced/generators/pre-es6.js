// Function needs to return a generator
function generateDataPre(url) {
  // Generator state
  let state;

  // Generator-wide variable declaration
  let sharedValue;

  // Handle each state
  function handleState(value) {
    switch (state) {
      case 1:
        // STATE 1
        // Initial state
        console.log('Requesting: ', url);
        return fetch(url);
      case 2:
        // STATE 2
        // Success state
        sharedValue = value;
        console.log('Value: ', sharedValue);
        return null;
      case 3:
        // STATE 3
        // Failure state
        var error = value; // eslint-disable-line
        console.log('Oops: ', error);
        return error;
      default:
        // STATE DEFAULT
        // Failure state
        console.log('Default: ', null);
        return null;
    }
  }

  // Make and return a generator
  return {
    next(value) {
      if (!state) {
        // STATE 1
        // Initial state
        state = 1;
        return {
          done: false,
          value: handleState(),
        };
      }
      if (state === 1) {
        // STATE 2
        // Success state
        state = 2;
        return {
          done: true,
          value: handleState(value),
        };
      }

      // Generator completed
      return {
        done: true,
        value: null,
      };
    },
    throw(error) {
      if (state === 1) {
        // STATE 3
        // Failure state
        state = 3;
        return {
          done: true,
          value: handleState(error),
        };
      }

      // Case for error NOT during the request
      throw error;
    },
  };
}

console.log('------- Pre-ES6 Generator ------');
const itPre = generateDataPre('https://jsonplaceholder.typicode.com/todos');
const valuePre = itPre.next();
console.log('Final: ', itPre.next(valuePre));
console.log('--------------------------------');
