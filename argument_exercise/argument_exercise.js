function sum(...nums) {
  // let nums = Array.from(arguments);
  let sum = 0;

  nums.forEach(num => { sum += num });
    debugger
  return sum;
}

// console.log(sum(1, 2, 3, 4) === 10);
// console.log(sum(1, 2, 3, 4, 5) === 15);

Function.prototype.myBind = function() {
  let context = arguments[0];
  let bindArgs = Array.from(arguments).slice(1);
  const that = this;

  return function () {
    let callArgs = Array.from(arguments);
    return that.apply(context, bindArgs.concat(callArgs));
  } 
}


// function print () {
//     console.log(`this.name = ${this.name}`);
//     for (let i = 0; i < arguments.length; i++) {
//         console.log(arguments[i]);
//     }
// }

function Dog (name) {
    this.name = name;
}

// const spot = new Dog('spot');
// const spotPrint = print.myBind(spot, "dog", "cat");
// spotPrint("spot is a dog", "spot is not a cat");
// spotPrint("spot likes bones", "spot likes going out");

function curriedSum(numArgs) {
  const nums = [];

  return function _curriedSums(num) {
    nums.push(num);

    if (nums.length === numArgs) {
      console.log(nums.reduce((acc, ele) => {return acc + ele}));
      return;
    }

    return _curriedSums;
  };
};

// const sum1 = curriedSum(4);
// sum1(5)(30)(20)(1); // => 56

Function.prototype.curry = function(numArgs) {
  const args = [];
  const ogFunc = this;

  return function _curried(arg) {
    args.push(arg);

    if (args.length === numArgs) {
      return ogFunc(...args);
    }

    return _curried;
  };

};

// Does this monkeypatch apply to instance methods too?
Function.prototype.curryApply = function (numArgs) {
  const args = [];
  const ogFunc = this; // this = Dog#multiply
    //   const obj = this.caller;
  // Why isn't there something like this:
  // const instance = ogFunc.owner


  // How do we save the dog instance?
  
  return function _curried(arg) {
    args.push(arg);
    
    if (args.length === numArgs) {
      debugger
      return ogFunc.apply(null, args); // spot.multiply(2, 5);
    }
    
    return _curried;
  };
};

function multiplyFour(num1, num2, num3, num4) {
  return num1 * num2 * num3 * num4;
};

// function dogMultiplyFour(num1, num2, num3, num4) {
//   return this.name + (num1 * num2 * num3 * num4).toString();
// };

Dog.prototype.multiply = function(num1, num2) {
  debugger
  return this.name + (num1 * num2).toString();
}

spot = new Dog("Spot");

// const func = spot.multiply.curryApply(2);
const func = multiplyFour.curryApply(4);

console.log(func(2)(3)(4)(5)); // "Spot10"
// console.log(spot.multiply(2,5));

// const func = spot.dogMultiplyFour.curry(spot, 4);

// const multiplyFourCurried = multiplyFour.curryApply(4);

// console.log(multiplyFourCurried(2)(3)(4)(5)); // => 120