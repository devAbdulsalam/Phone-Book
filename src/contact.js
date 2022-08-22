class Contact{
    constructor(contactId, firstName, lastName, phone, company, email, relationship, address, lastcall, favourite){
    this.contactId = contactId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.company = company;
    this.email = email;
    this.relationship = relationship;
    this.address = address;
    this.lastcall = lastcall;
    this.favourite = favourite;
    }
};

saveContactbtn.addEventListener('click', () => {
    if( document.getElementById("firstName").value == "" ||
        document.getElementById("lastName").value == ""||
        document.getElementById("phone").value == "" ||
        document.getElementById("company").value == ""||
        document.getElementById("email").value == "" ||
        document.getElementById("relationship").value == "" ||
        document.getElementById("address").value == ""
        ){
        console.log("fill in something man")
    } else {
    AddToDataBase()
    clearFields()
    }
})

function clearFields(){
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("company").value = "";
    document.getElementById("email").value = "";
    document.getElementById("relationship").value = "";
    document.getElementById("address").value = "";
    }
        
        
function AddToDataBase(){
    let contactId = new  Date().getTime()
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let phone = document.getElementById("phone").value;
    let company = document.getElementById("company").value;
    let email = document.getElementById("email").value;
    let relationship = document.getElementById("relationship").value;
    let address = document.getElementById("address").value;
    let favourite = 0;
    let lastcall = 0;
    
    // //initiating new Contact
    const contact = new Contact(contactId, firstName, lastName, phone, company, email, relationship, address, lastcall, favourite);
    
    // //close form
    document.getElementById("createContactForm").classList.add("hideme");
    document.getElementById("createContactForm").classList.remove("showme")

    // // refresh contact
    document.location.reload()

    // //saveContactToLocalStorage
    saveContactToLocalStorage(contact)
    return contact
}

function saveContactToLocalStorage(contact){
    const contacts = contact;
     let items = getlocalStorage();    

    items.push(contacts);
    localStorage.setItem("contacts", JSON.stringify(items))
        console.log("contact has been saved");
};    


function getlocalStorage(){
    const fromLocal = JSON.parse(localStorage.getItem("contacts"));
    if (fromLocal === null) {
        return []
    } else {
        return fromLocal
    }
}

let favouriteList = document.getElementById("favouriteList");
const myContactList = document.querySelectorAll("#myContactList");
let bgColor = ["green", "yellow", "gray"]
let finalBgColor
function ColorCode() {
    for (let counter = 0; counter < bgColor.length; counter++) {
        finalBgColor = bgColor[Math.floor(Math.random() * bgColor.length)]
    }
    return finalBgColor;
};
 window.addEventListener('DOMContentLoaded', setContact())
function setContact(){
    const contactList = getlocalStorage();
    sortFavourite(contactList)
    sortAllContact(contactList)
    SortHistory(contactList)
}

function sortFavourite(contactList) {
    contactList.sort(function(a, b){return b.favourite - a.favourite})
    Loadfavouritecontact(contactList);
    }
function Loadfavouritecontact(contactList){
       let favouritecontacts = contactList.map( function (contact){
            return `
            <article id="call" class="border-solid border border-white p-2 relative">
                <div id="myId" class="hidden">${contact.contactId}</div>
                <div onclick="event.stopPropagation()">    
                    <div id="fullContact" class="text-white text-2xl flex flex-col top-1 right-2 mx-2 font-bold cursor-pointer absolute">
                            <span class="-pt-3 -mt-3">.</span>
                            <span class="-pt-3 -mt-5">.</span>
                            <span class="-pt-3 -mt-5">.</span>
                    </div>
                </div>
                <h1 class="uppercase text-gray-100 text-8xl text-center">${contact.firstName.charAt(0).toUpperCase()}</h1>
                <div class="flex justify-between p-2">
                    <h2 class="text-white text-2xl uppercase">${contact.firstName}</h2>
                    <div onclick="event.stopPropagation()">  
                        <i id="favStar" class="fas fa-star text-white text-sm"></i>
                    </div>
                </div>
                </article>`
            })
            favouritecontacts = favouritecontacts.join("");
            myContactList.forEach( function (contactList){
                favouriteList.innerHTML = favouritecontacts;
            let article = favouriteList.querySelectorAll("article");        
            article.forEach( article => {
                    article.style.backgroundColor  = ColorCode();
                })
        })
        let fullContact = document.querySelectorAll("#fullContact")
        fullContact.forEach( (fullContact) => {
            fullContact.addEventListener('click', (e) => {
                let openFulllContact = e.currentTarget.parentElement
                let contactList = getlocalStorage();
                contantFullDetails.classList.remove("hideme")
                let myId = openFulllContact.parentElement.querySelector("#myId").innerHTML
                let myFullContact =  contactList.filter( function (contact){
                    if(myId == contact.contactId){
                        return contact
                    }
                })
              displayContantFullDetails(myFullContact)
            })
        })
        let favStar = document.querySelectorAll("#favStar")
        favStar.forEach( (favStar) => {
            favStar.addEventListener('click', () => {
                let items = getlocalStorage();
                let myId = favStar.parentElement.parentElement.parentElement.querySelector("#myId").innerHTML
                items = items.filter( function (item){
                    if(myId == item.contactId){
                        item.favourite = true
                    }
                    console.log(item)
                    return item
                })
                localStorage.setItem("contacts", JSON.stringify(items))
            })
        })    
    }
// //History Function
function SortHistory(contactList) {
    contactList.sort(function(a, b){return b.lastcall - a.lastcall})
    loadHistory(contactList);
    }

function loadHistory(contactList){
let historyArticles = document.getElementById("hArticles")
    let historyContacts = contactList.map( function (contact){
            return `
            <div class="flex px-3 cursor-pointer">
                <div class="w-10/12 flex flex-col space-y-1 ">
                    <h1 class="uppercase font-body text-2xl">${contact.firstName.toUpperCase()}</h1>
                    <div>
                        <span class="fa fas fa-arrow-circle-down text-green-600"></span>
                        <span class="fa fas fas fa-directions text-red-500"></span>
                        <span>Mobile</span>
                        <span>${contact.lastcall}2 hr. ago</span>
                    </div>
                    <div>
                        <p class="text-green-300">Unlimited MD</p>
                    </div>
                </div>
                <div  id="call" class="cursor-pointer flex items-center">
                    <i class="fa fa fa-phone text-3xl text-green-800"></i>
                </div>
            </div>`
    })
    historyContacts = historyContacts.join("");
    historyArticles.innerHTML = historyContacts;
}

function sortAllContact(contactList) {
  contactList.sort(function(a, b){
    var x = a.firstName.toLowerCase();
    var y = b.firstName.toLowerCase();
    if (x < y) {return -1;}
    if (x > y) {return 1;}
    return 0;
  });
  displaycontact(contactList);
}

function displaycontact(contactList){
       let displaycontacts = contactList.map( function (contact){
            return `
            <article id="contactName" class="my-2">
                <div class="flex items-center ">
                    <div class="w-2/12">
                        <div id="firstLetter" class="rounded-full text-center p-3 bg-blue-500">
                            <h2 class="text-2xl cursor-pointer">${contact.firstName.charAt(0).toUpperCase()}</h2>
                        </div>
                    </div>
                    <h3 id="myName" class="text-2xl mx-5 my-4 cursor-pointer">${contact.firstName}</h3>
                </div>
            </article>`
        })
        displaycontacts = displaycontacts.join("");
        myContactList.forEach( function (contactList){
            contactList.innerHTML = displaycontacts;
            // console.log(contactList)
            let firstLetter = contactList.querySelectorAll("#firstLetter");        
            firstLetter.forEach( Letter => {
                    Letter.style.backgroundColor  = ColorCode();
                })
        })
    }

const contantFullDetails = document.getElementById("contantFullDetails");
///////////function to hidefull details
function hideDetails(){
    contantFullDetails.classList.add("hideme")
}
//////////contantFullDetails
myContactList.forEach((myContactList) =>{
    const contactNames = myContactList.querySelectorAll("#contactName");
    contactNames.forEach(contactName =>{
        const contactList = getlocalStorage();
        contactName.addEventListener('click', (e) => {
            allcontact.classList.add("hideme")
            contantFullDetails.classList.remove("hideme")
            const myDetails = e.target.parentElement;
            let myName = myDetails.querySelector("#myName").innerHTML;
            let myFullContact = contactList.filter( function (contact){
                if(contact.firstName === myName){
                    return contact
                }
            })
            displayContantFullDetails(myFullContact)
        })
    })  
})

   // // searchContact
let searchForcontact = function (){
    // console.log("i am working")
    let items = getlocalStorage();
    let value = searchbar.value.toLowerCase()
    items = items.filter(function (item){
        if (item.phone.includes(value) || item.firstName.toLowerCase().includes(value) || item.lastName.toLowerCase().includes(value)){
            return item
        }
    })
    displaycontact(items)
}
searchbar.addEventListener('input', searchForcontact)
displayNumbers.addEventListener('input', searchForcontact)

const contactName = contantFullDetails.querySelector("#contactName")
const phoneNumber = contantFullDetails.querySelector("#phoneNumber");
const myEmail = contantFullDetails.querySelector("#myEmail");
const myRelationship = contantFullDetails.querySelector("#myRelationship");
const myAddress = contantFullDetails.querySelector("#myAddress");
const myCompany = contantFullDetails.querySelector("#myCompany");
const mycontactId = contantFullDetails.querySelector("#mycontactId");
function displayContantFullDetails(fullContact){
    fullContact.map(function (myContact){
        contactName.innerHTML = `${myContact.firstName + " " + myContact.lastName}`;
        phoneNumber.innerHTML = myContact.phone;
        myCompany.innerHTML = myContact.company;
        myEmail.innerHTML = myContact.email;
        myRelationship.innerHTML = myContact.relationship;
        myAddress.innerHTML = myContact.address;
        mycontactId.innerHTML = myContact.contactId;
 })
}

// delete Contact from local Storage
let deleteContact = document.getElementById("deleteContact")
deleteContact.addEventListener('click', deleteContactfromLocalStorage)
function deleteContactfromLocalStorage(){
    let contactId = mycontactId.innerHTML
    let items = getlocalStorage();
    items = items.filter(function (item){
        if (item.contactId != contactId){
            console.log(item)
            return item
        }
    })

    localStorage.setItem("contacts", JSON.stringify(items))

     // //close form
    document.getElementById("createContactForm").classList.add("hideme");
    document.getElementById("createContactForm").classList.remove("showme")

    // // refresh contact
    document.location.reload()

};

// // // //edit Contact from local Storage
let editContact = document.getElementById("editContact")
let saveContact = document.getElementById("saveContact")
let edit = document.getElementById("edit")
let editContactbtn = document.getElementById("editContactbtn")
editContact.addEventListener('click', editContactform)
function editContactform(){
    createContactForm.classList.remove("hideme")
    createContactForm.classList.add("z-50")
    createContactForm.classList.remove("z-20")
    edit.classList.remove("hideme")
    saveContact.classList.add("hideme")
    let items = getlocalStorage();
    items = items.filter(function (Contact){
        if (mycontactId.innerHTML == Contact.contactId){
            document.getElementById("firstName").value = Contact.firstName;
            document.getElementById("lastName").value = Contact.lastName;
            document.getElementById("phone").value = Contact.phone;
            document.getElementById("company").value = Contact.company;
            document.getElementById("email").value = Contact.email;
            document.getElementById("relationship").value = Contact.relationship;
            document.getElementById("address").value = Contact.address;
        }
    })
};

editContactbtn.addEventListener('click', editContactfromLocalStorage)
function editContactfromLocalStorage(){
    createContactForm.classList.add("hideme")
    createContactForm.classList.remove("z-50")
    createContactForm.classList.add("z-20")
    edit.classList.remove("hideme")
    saveContact.classList.add("hideme")
    let items = getlocalStorage();
    items = items.filter(function (item){
        if (mycontactId.innerHTML == item.contactId){
            item.firstName = document.getElementById("firstName").value;
            item.lastName = document.getElementById("lastName").value;
            item.phone = document.getElementById("phone").value;
            item.company = document.getElementById("company").value;
            item.email = document.getElementById("email").value;
            item.relationship = document.getElementById("relationship").value;
            item.address = document.getElementById("address").value;
        }
        return item
    })
    localStorage.setItem("contacts", JSON.stringify(items))

    // // refresh contact
    document.location.reload()
    console.log("contact edited")
}
function updateCallLogs(mycontactId){
    function getLastCall(mycontactId){
        let items = getlocalStorage();
        items = items.filter(function (item){
            if (mycontactId.innerHTML == item.contactId){
                item.lastcall = new  Date().getTime()
                // console.log(item.lastcall)
            }
            return item
        })
        localStorage.setItem("contacts", JSON.stringify(items))
    }
    function updateFavourite(mycontactId){
        let items = getlocalStorage();
        items = items.filter(function (item){
            if (mycontactId.innerHTML == item.contactId){
                item.favourite +=1
                // console.log(item.favourite)
            }
            return item
        })
        localStorage.setItem("contacts", JSON.stringify(items))
    }
    getLastCall(mycontactId)
    updateFavourite(mycontactId)
    setContact()
}
const calling = document.getElementById("calling");
const calls = document.querySelectorAll("#call");
let callingName = document.getElementById("callingName");
const callingNumber = document.getElementById("callingNumber");
let callsound = document.getElementById("myAudio"); 
let timer = document.getElementById("timer");
let updateTimer
function setUpdate(){
    if(!isNaN(callsound.duration)){
        let currentMinutes = Math.floor(callsound.currentTime / 60);
        let currentSeconds = Math.floor(callsound.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(callsound.duration / 60);
        let durationSeconds = Math.floor(callsound.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        timer.textContent = currentMinutes + ":" + currentSeconds;
    }
}
calls.forEach(call =>{
    call.addEventListener('click', (e) => {
        calling.classList.remove("hideme");
        calling.classList.add("z-50");
        playAudio()
        setUpdate()
        updateCallLogs(mycontactId)
        callsound.volume = 1
        clearInterval(updateTimer);
        updateTimer = setInterval(setUpdate, 1000)
        // let callthis = e.target;
        let callTarget = e.target.parentElement
        if(!callTarget.classList.contains("dialPadCall")){
            console.log("dialPadCall")
            callingName.innerHTML = contactName.innerHTML;
            callingNumber.innerHTML = phoneNumber.innerHTML;
        }
    callsound.addEventListener('ended', closeCalling)
    })
})
function playAudio() { 
  callsound.play(); 
} 
function pauseAudio() { 
  callsound.pause(); 
}
let mute = document.getElementById("mute");
let mic = mute.querySelector("#mic")
mute.addEventListener('click', () => {
    mic.classList.toggle("text-green-400");
})
let Speaker = document.getElementById("Speaker");
let spk = Speaker.querySelector("#spk")
Speaker.addEventListener('click', () => {
    let audioVolume = callsound.volume
    spk.classList.toggle("text-green-400");
    if(audioVolume === 1){
        console.log("audioVolume = 0")
        return callsound.volume = 0
    } else {
        console.log("audioVolume = 1")
        return callsound.volume = 1
    }
})
let Keypad = document.getElementById("Keypad");
Keypad.addEventListener('click', () => {
    dialpad.classList.remove("hideme");
        // calling.classList.remove("hideme");
})
// //Close Calling
function closeCalling(){
    calling.classList.add("hideme")
    calling.classList.remove("z-50");
    mic.classList.remove("text-green-400");
    spk.classList.remove("text-green-400");
    pauseAudio()
}



// phoneNumber.innerHTML = myPhoneNumber
    // console.log(myfullContact)
    // console.log(fullContact.phone)


    // myContact.phone
    // myContact.firstName
    // myContact.lastName
    // myContact.email
    // myContact.company
    // myContact.relationship
    // myContact.address
    // // instatiate UI
    // const ui = new UI();
    
    // // clear fields
    // clearFields()
    // localStorage.setItem("Books", JSON.stringify(items));