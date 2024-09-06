var length = 5;
function a() {
    console.log(this.length);
    function b(fn) {
        fn();
        arguments[0]();
    }
    b(a, 1);
}
a();
