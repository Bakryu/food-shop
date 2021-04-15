export const formValidators = {
  name: [isEmpty, isLetters],
  number: [isEmpty, isNumbers, isRequiredLength],
};

function isEmpty(value) {
  if (!value) {
    return "This field in required";
  }
}

function isLetters(value) {
  const rangeLetters = new RegExp(/[A-zА-я\s]/);
  let isLetter = true;
  const arrayLetters = value.split("");

  arrayLetters.forEach((letter) => {
    if (!rangeLetters.test(letter)) {
      isLetter = false;
    }
  });

  if (!isLetter) {
    return "Only letters allowed";
  }
}

function isNumbers(value) {
  const rangeNumbers = new RegExp(/[0-9\s]/);
  let isNumber = true;
  const arrayNumbers = value.split("");

  arrayNumbers.forEach((number) => {
    if (!rangeNumbers.test(number)) {
      isNumber = false;
    }
  });

  if (!isNumber) {
    return "Only numbers allowed";
  }
}
function isRequiredLength(value) {
  if (value.length !== 12) {
    return "Should contain 12 characters";
  }
}
