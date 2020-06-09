console.log("Load page complete")
const weatherForm = document.querySelector('form')
const searchKey = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    message1.textContent = 'Loading...'
    message2.textContent = ''
    fetch(`/weather?address=${searchKey.value}`).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                message1.textContent = data.error
            } else {
                message1.textContent = data.location
                message2.textContent = data.forecast
            }
        })
    })
})

