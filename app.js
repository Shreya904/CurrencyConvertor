//const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const BASE_URL = "https://api.exchangerate-api.com/v4/latest/"; //this is the latest api for exhange rates

const dropdowns = document.querySelectorAll(".dropdown select");//selecting both selects
const btn = document.querySelector("form button"); //accessing the button
const fromCurr = document.querySelector(".from select"); //accessing the from currency value
const toCurr = document.querySelector(".to select"); //accessing the to currency value
const msg = document.querySelector(".msg"); //selecting the message which will show the final result

for(let select of dropdowns){ //using for of loop to access both selects from dropdown
    for(currCode in countryList){//accessing the value of currency code from the other file
        let newOption = document.createElement("option");//creating a new element 'option' which will contain all countries' currency code
        newOption.innerText = currCode; //assigning the currency code from the loop to the new option
        newOption.value = currCode; //setting the value of the option
        if(select.name === "from" && currCode === "USD"){ 
            newOption.selected = "selected"; //assinging the default from val
        }else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected"; //assinging the default to val
        }
        select.append(newOption);//adding the created option in both select dropdowns
    }
    select.addEventListener("change", (evt) =>{ //creating an event listener which will activate when the evt.target change
        updateFlag(evt.target); // tells where the change has occured and calls for the function when a change occurs
    })
}

const updateFlag = (element) =>{//update the flag icons
    let currCode = element.value;//extracts the changed value 
    let countryCode = countryList[currCode];//access the country code value from the other file using keyvalue pair method
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;//a template literal which will change the flag icon according to the country code
    let img = element.parentElement.querySelector("img");//using the path to the image to select it 
    img.src = newSrc;//changing the icon when the function is called
}

btn.addEventListener("click", async (evt) => { //main event listener which will display the results
    evt.preventDefault();//prevent from all the default changes in case of the event
    let amount = document.querySelector(".amount input"); //selecting the input by the user
    let amtValue = amount.value;//accessing the value of the input
    // console.log(amtValue);
    if(amtValue === "" || amtValue<1){ 
        amtValue = 1;
        amount.value = "1";
    }
    console.log(fromCurr.value);//accessing the value of the curr
    console.log(toCurr.value);//accessing the value of the curr

    let URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}`;//using the api's base url and following the template literal pattern to access form currency variable
    let response = await fetch(URL);//using fetch api which gets a response from the given api in JSON format
    let data = await response.json();//converting the response to js object
    console.log(data.rates);//displays all countries' exchange rates wrt the from currency code
    let rate = data.rates[toCurr.value.toUpperCase()];//accessing the selectes countries' exchange rate 
    console.log(rate);//displaying the rate
    let finalAmount = amount.value * rate;//calculating the final value
    console.log(finalAmount);
    msg.innerText = `${amtValue} ${fromCurr.value} =  ${finalAmount} ${toCurr.value}`; //displaying the final value

})



    // console.log(fromCurr.value,toCurr.value);
    // const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}`;
    // let response = await fetch(URL);
    // let data = await response.json();
    // let rate = data[toCurr.value.toLowerCase()];

    // let finalAmount = amtValue * rate;
    // msg.innerText = `${amtValue} ${fromCurr} = ${finalAmount} ${toCurr}`;