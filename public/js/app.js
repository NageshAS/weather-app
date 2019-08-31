const form = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#location')
const messageTwo = document.querySelector('#forecast')

form.addEventListener('submit',(e)=>{
    e.preventDefault()

    const address = search.value
    const query = '/weather?address='+address

    messageOne.textContent = 'loading...'
    messageTwo.textContent= ''

    fetch(query).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error
        }else{
            messageOne.textContent = data.place
            messageTwo.textContent = data.forecast
        }
        
    })
})

})