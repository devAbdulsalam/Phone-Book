const welcome_section = document.getElementById("welcome_section")
const welcome = document.getElementById("welcome")
const body_section = document.getElementById("body_section")
// //toggle between welcome_section and body_section
welcome.addEventListener('click', () =>{
    // if(body_section.classList === "hideme"){
        body_section.classList.remove("hideme")
        welcome_section.classList.add("hideme");

})

// const head = document.getElementById("head")
const navBtn = document.querySelectorAll("#navBtn")
const navSection = document.querySelectorAll("#navSection")
// //toggle between nav and section
// head.addEventListener('click', (e) =>{
//     const target = e.target;

const openSettingMenu = document.getElementById("openSettingMenu");
const settingMenu = document.getElementById("settingMenu");
openSettingMenu.addEventListener('click', () =>{
        settingMenu.classList.add("showme")
        settingMenu.classList.remove("hideme")
    })
settingMenu.addEventListener('click', () =>{
    settingMenu.classList.add("hideme")
    settingMenu.classList.remove("flex")
})
const openContactMenu = document.getElementById("openContactMenu");
const fullContactsettingMenu = document.getElementById("fullContactsettingMenu");
openContactMenu.addEventListener('click', () =>{
        fullContactsettingMenu.classList.add("flex")
        fullContactsettingMenu.classList.remove("hideme")
    })
fullContactsettingMenu.addEventListener('click', () =>{
    fullContactsettingMenu.classList.add("hideme")
    fullContactsettingMenu.classList.remove("flex")
})

navBtn.forEach(btn =>{
    btn.addEventListener('click', (e) =>{
        navBtn.forEach(btn =>{
            btn.classList.remove("active_nav");
            e.target.classList.add("active_nav");
        })
        navSection.forEach(section =>{
            section.classList.add("hideme")
            if(section.dataset.id === e.target.dataset.id){
                section.classList.remove("hideme")
            }
        });
    }); 
});


const hArticle = document.querySelectorAll("#hArticle");
const otherDetails = document.querySelectorAll("#otherDetails");
// / //toggle between nav and section
hArticle.forEach(article =>{
    article.addEventListener('click', (e) =>{
        otherDetails.forEach(details =>{
            details.classList.add("hideme")
        })
     let mytarget = article.children[1]
     mytarget.classList.remove("hideme")
    })
})





//////createContactForm
const createContactForm = document.getElementById("createContactForm");
function dispalyCreateContactForm(){
    createContactForm.classList.add("showme")
    createContactForm.classList.remove("hideme")
}
function hideCreateContactForm(){
    createContactForm.classList.add("hideme")
    createContactForm.classList.remove("showme")
}


const help = document.getElementById("help");
function showHelp(){
    help.classList.add("showme")
    help.classList.remove("hideme")
}
const contactbody = document.getElementById("contactbody");
contactbody.addEventListener('click', () => {
    help.classList.add("hideme")
    help.classList.remove("showme")
})

// // //DIALPADS
let displayNumbers = document.getElementById("displayNumbers");
const dialbuttons = document.querySelector("#buttons")
let dial = dialbuttons.querySelectorAll(".button")
let allmycontact = document.getElementById("allmycontact")
let dialNumber = []
dial.forEach(button =>{
    button.addEventListener('click', (e) => {
        allcontactH1.classList.remove("hideme")
        let myContactList = allcontact.querySelector("#myContactList")
        myContactList.classList.remove("hideme")
        if(e.target.innerHTML === `#` || e.target.innerHTML === "*" ){
            let digit = e.target.innerHTML
            dialNumber.push(digit)
            displayNumbers.value = dialNumber.join("")
            searchbar.value = dialNumber.join("")
            searchForcontact();
        }
        if(e.target.innerHTML.match(/[0-9]/g)){
            let pElement = e.target.parentElement;
            let digit = pElement.children[0].innerHTML
            dialNumber.push(digit)
            displayNumbers.value = dialNumber.join("")
            searchbar.value = dialNumber.join("")
            searchForcontact();
        }
        if(button.id == "call"){
            // const calling = document.getElementById("calling");
            const callingNumber = document.getElementById("callingNumber");
            dialpad.classList.add("hideme")
            allcontact.classList.add("hideme")
            callingNumber.innerHTML = displayNumbers.value;
            // callNumber()
            // calling.classList.remove("hideme");
            // if(displayNumbers.value.length >= 13){
            // // console.log("closeDialPad")
            // console.log("remove")
            // }
        }
        if(displayNumbers.value.length >= 11){
            // STOP PUSHING DIGIT
        }
        if(button.id == "closeDialPad"){
            dialpad.classList.add("hideme")
            // console.log(dialNumber)
            if(dialNumber == [] || dialNumber == [""]){
                allcontact.classList.add("hideme")
                allcontact.classList.remove("showme")
            }else{
                showSearchbar.classList.add("flex")
                showSearchbar.classList.remove("hideme")
            }
        }

    })
})

let removelastinput = document.querySelectorAll("#removelastinput");
removelastinput.forEach(function (removelastinput){
    removelastinput.addEventListener('click', () =>{
        dialNumber.pop();
        searchForcontact();
        displayNumbers.value = dialNumber.join("")
        searchbar.value = dialNumber.join("")
        // console.log(dialNumber)
    })
})

let dialpad = document.getElementById("dialpad")
let allcontact = document.getElementById("allcontact")
let allcontactH1 = document.getElementById("allcontactH1")
let opendialpad = document.getElementById("opendialpad")
opendialpad.addEventListener('click', () =>{
    dialpad.classList.remove("hideme")
    allcontact.classList.add("showme")
    allcontact.classList.remove("hideme")
    showSearchbar.classList.remove("flex")
    showSearchbar.classList.add("hideme")
    allcontactH1.classList.add("hideme")
   let myContactList = allcontact.querySelector("#myContactList")
    myContactList.classList.add("hideme")
    displaydialinput.classList.add("showme")
    displaydialinput.classList.remove("hideme")
})

//////showsearchFeild
const showsearchFeild = document.getElementById("showsearchFeild");
const showSearchbar = document.getElementById("showSearchbar");
const hidesearchbar = document.getElementById("hidesearchbar");
const searchbar = document.getElementById("searchbar");
showsearchFeild.addEventListener('click', (e) =>{
    allcontact.classList.add("showme")
    allcontact.classList.remove("hideme")
    // allmycontact.classList.toggle("hideme")
})
searchbar.addEventListener('click', () =>{
    dialpad.classList.add("showme")
    dialpad.classList.remove("hideme")
    displaydialinput.classList.remove("showme")
    displaydialinput.classList.add("hideme")
})

hidesearchbar.addEventListener('click', () =>{
    allcontact.classList.add("hideme")
    allcontact.classList.remove("showme")
    dialpad.classList.remove("showme")
    dialpad.classList.add("hideme")
    displayNumbers.value = ""
    searchbar.value = ""
    dialNumber = []
})



// get current year for footer
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear().toString();

// const contantName = contantFullDetails.querySelector("#contactName")
// const hArticle = document.querySelectorAll("#hArticle");
// const otherDetails = document.querySelectorAll("#otherDetails");
// // / //toggle between nav and section
// hArticle.forEach(article =>{
//     article.addEventListener('click', (e) =>{

// var email = document.getElementById("email");
// var email = document.getElementById("email");
// var password = document.getElementById("password");
//     // // for error messages on the form23
// let errorMsg = function(MsgId, message, color, time){
//     const errMsg = document.getElementById(MsgId)
//     errMsg.classList.remove("hideme")
//     errMsg.innerHTML = message;
//     errMsg.classList.add(color);
// function closeCalling(){
//     setTimeout(() => {
//         calling.classList.add("hideme")
//     }, 3000);
// }


// hidesearchbar.addEventListener('click', (e) =>{
//     showSearchbar.classList.add("hideme")
//     showSearchbar.classList.remove("showme")
// hidesearchbar.addEventListener('click', (e) =>{
//     showSearchbar.classList.add("hideme")
//     showSearchbar.classList.remove("showme")
//     showsearchFeild.classList.add("flex")
//     showsearchFeild.classList.remove("hideme")
// })
// const searchbar = document.getElementById("searchbar");
// const searchContact = document.getElementById("searchContact");
// searchContact.addEventListener('click', (e) =>{
//     searchbar.classList.add("showme")
//     searchbar.classList.remove("hideme")
// })