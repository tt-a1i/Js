new Promise((resolve, reject) => {
    reject('err')
})
    .then(res => console.log(res))
    .catch(err => {
        console.log(err)
        return err
    })
    .then(res => console.log(res))