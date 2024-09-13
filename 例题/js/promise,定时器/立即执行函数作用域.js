for(var i = 0; i < 5; i++){
    (function(i){
        setTimeout(() => {
            console.log(i);
        })
    })(i)
}