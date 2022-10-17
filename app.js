/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip='  
const apiKey = '&appid=5ff728df3a14bf3cc1ea066d548d5165&units=metric'

const performAction = async () => {
        //get input data from user zip & feelings
        let zip = document.getElementById('zip').value
        let feelings = document.getElementById('feelings').value
        // Create a new date instance dynamically with JS
        let d = new Date();
        let date = `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()}`
        //get temp via Api via get route 
    const res = await fetch(baseUrl + zip + apiKey)
        const data = await res.json()
        const temp = data.main.temp

        //send all  data to the local server via post route 
        await fetch('/sendingData', {
            method: 'post',
            headers: { 'content-Type': 'application/json' },
            body: JSON.stringify({ temp, feelings, date })
        })
        //get all the data back  from the local server via get route
    const response = await fetch('/recieveData')
    try {
        const Data = await response.json()

        //update the UI 
        document.getElementById('date').innerHTML = ` Today date : ${Data.date}`
        document.getElementById('temp').innerHTML = `Temprature : ${Data.temp}`
        document.getElementById('content').innerText = `Feelings : ${Data.feelings}`

// if any error happend it will appear on console to handle 
    } catch {
        console.log('Error', Error)
    }

}
// addEventListener when click on generate button to perform a callback function 
    const button = document.getElementById('generate').addEventListener('click', performAction);
