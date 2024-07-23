let a, b;
a = new Promise((resolve) => {
  setTimeout(() => {
    resolve(b);
  }, 1000);
});
b = new Promise((resolve) => {
  resolve(a);
});