function createChild(input, output, prevIdx) {
  if (input.pos === prevIdx) {
    output.push(input);
  } else if (input.pos > prevIdx) {
    prevIdx += 1;
    let children = output[output.length - 1].children;
    if (!children) {
      children = [];
      output[output.length - 1].children = children;
    }
    createChild(input, children, prevIdx);
  } else if (input.pos < prevIdx) {
    prevIdx -= 1;
    let children = output[output.length - 1].children;
    if (!children) {
      children = [];
      output[output.length - 1].children = children;
    }
    createChild(input, children, prevIdx);
  }
}

function getNestedJSON(input) {
  console.log("Input");
  console.dir(input, { depth: null, colors: true });
  output = [];
  prevIdx = 1;
  for (i = 0; i < input.length; i++) {
    createChild(input[i], output, prevIdx);
  }
  console.log("==================================");
  console.log("Output");
  console.dir(output, { depth: null, colors: true });
  console.log("==================================");
}

function runTestforFixedValues() {
  var inputSets = [];
  var input = [
    { pos: 1, text: "Andy" },
    { pos: 1, text: "Harry" },
    { pos: 2, text: "David" },
    { pos: 3, text: "Dexter" },
    { pos: 2, text: "Edger" },
    { pos: 1, text: "Lisa" }
  ];
  inputSets.push(input);
  input = [
    { pos: 1, text: "Andy" },
    { pos: 2, text: "Harry" },
    { pos: 2, text: "David" },
    { pos: 1, text: "Dexter" },
    { pos: 2, text: "Edger" },
    { pos: 2, text: "Lisa" }
  ];
  inputSets.push(input);
  input = [
    { pos: 1, text: "Andy" },
    { pos: 2, text: "Harry" },
    { pos: 3, text: "David" },
    { pos: 4, text: "Dexter" },
    { pos: 5, text: "Edger" },
    { pos: 6, text: "Lisa" }
  ];
  // All those involving Alphabets were generated from the random function
  inputSets.push(input);
  input = [
    { pos: 1, text: "A" },
    { pos: 2, text: "B" },
    { pos: 2, text: "C" },
    { pos: 2, text: "D" },
    { pos: 1, text: "E" },
    { pos: 2, text: "F" },
    { pos: 2, text: "G" }
  ];
  inputSets.push(input);
  input = [
    { pos: 1, text: "A" },
    { pos: 2, text: "B" },
    { pos: 1, text: "C" },
    { pos: 2, text: "D" },
    { pos: 2, text: "E" },
    { pos: 3, text: "F" },
    { pos: 4, text: "G" },
    { pos: 5, text: "H" },
    { pos: 5, text: "I" },
    { pos: 4, text: "J" },
    { pos: 4, text: "K" },
    { pos: 5, text: "L" }
  ];
  inputSets.push(input);
  input = [
    { pos: 1, text: "A" },
    { pos: 1, text: "B" },
    { pos: 1, text: "C" },
    { pos: 2, text: "D" },
    { pos: 1, text: "E" },
    { pos: 1, text: "F" },
    { pos: 2, text: "G" },
    { pos: 1, text: "H" },
    { pos: 1, text: "I" },
    { pos: 2, text: "J" },
    { pos: 3, text: "K" },
    { pos: 3, text: "L" }
  ];

  inputSets.push(input);

  inputSets.map(inputJSON => {
    getNestedJSON(inputJSON);
  });
}

function runTestforRandom() {
  var inputArray = [];
  let alphabetsArray = [];
  for (i = "A".charCodeAt(0); i <= "Z".charCodeAt(0); i++) {
    alphabetsArray.push(String.fromCharCode(i));
  }

  var maxNumberOfElements = getRandomNumber(3, 10);
  var inputObject = [];

  // All we need is -1,0,-1 just change the number of occurances to control the
  // likelihood of the value being used. CRUDE IMPLEMENTATION :P
  var incrementArray = [-1, -1, 0, 1, 1, 1, 1, 1];
  pos = 1;
  inputArray.push({ pos: pos, text: "A" });
  for (var i = 1; i < maxNumberOfElements; i++) {
    randomNumber = getRandomNumber(1, incrementArray.length) - 1;
    increment = incrementArray[randomNumber];
    tempValue = pos + increment;
    pos = tempValue > 0 ? tempValue : 1;
    var obj = new Object();
    obj.pos = pos;
    obj.text = alphabetsArray[i % 26];
    inputArray.push(obj);
  }
  getNestedJSON(inputArray);
}

function runTests() {
  console.log("===========================================");
  console.log("Running Tests for Fixed Values\n");
  runTestforFixedValues();
  console.log("\nRunning Tests for Random\n");
  loop(runTestforRandom, 10);
}

function getRandomNumber(start = 1, end = 10) {
  if (start > end) {
    [start, end] = [end, start];
  }
  let range = end - start + 1;
  return (parseInt(Math.random() * range) % range) + start;
}

const loop = (fn, times = 5, params = []) => {
  if (!times) {
    return;
  }
  fn(...params);
  loop(fn, times - 1, params);
};

runTests();
