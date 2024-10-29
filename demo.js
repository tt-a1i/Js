function demoPromiseRace() {
    const promise2 = new Promise((_, reject) => {
        reject("Rejected after 100ms");
    });
    const promise1 = new Promise((resolve) => {
        resolve("Resolved after 100ms");
    });


    promise2.catch((err) => console.log(err));
    promise1.then((res) => console.log(res)).catch((err) => console.log(err));
}

demoPromiseRace();
