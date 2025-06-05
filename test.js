let activeStepDataSaved = [
  { 0: false },
  { 1: false },
  { 2: false },
  { 3: false },
  { 4: false },
  { 5: false },
  { 6: false },
];

console.log(activeStepDataSaved);

activeStepDataSaved[1] = {
  1: true,
};

const current = 4;

activeStepDataSaved[current] = {
  [current]: true,
};
console.log(activeStepDataSaved);
