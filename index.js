

var activeImageId = 1;
var nextImageId =  2;

setInterval(function () {
    if (nextImageId > 2) {
        nextImageId = 1;
    }

    document.getElementById("img" + activeImageId).classList.replace("visible", "hidden");
    document.getElementById("img" + nextImageId).classList.replace("hidden", "visible");

    activeImageId = nextImageId;
    nextImageId++;
}, 1000);

// chatgpt//
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtimedatabase-dc3df-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const MemoriesListInDB = ref(database, "MemoriesList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const MemoriesListEl = document.getElementById("Memories-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    if (inputValue.trim() !== "") {  // Check if input value is not empty or only whitespace
        push(MemoriesListInDB, inputValue)
    }
    
    clearInputFieldEl()
})

onValue(MemoriesListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearMemoriesListEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToMemoriesListEl(currentItem)
        }    
    } else {
        shoppingListEl.innerHTML = "No items here... yet"
    }
})

function clearMemoriesListEl() {
    MemoriesListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToMemoriesListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `MemoriesList/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    MemoriesListEl.append(newEl)
}

//chatgpt//


// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
// import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

// const appSettings = {
//     databaseURL: "https://realtimedatabase-dc3df-default-rtdb.europe-west1.firebasedatabase.app/"
// }

// const app = initializeApp(appSettings)
// const database = getDatabase(app)
// const shoppingListInDB = ref(database, "shoppingList")

// const inputFieldEl = document.getElementById("input-field")
// const addButtonEl = document.getElementById("add-button")
// const shoppingListEl = document.getElementById("shopping-list")

// addButtonEl.addEventListener("click", function() {
//     let inputValue = inputFieldEl.value
    
//     push(shoppingListInDB, inputValue)
    
//     clearInputFieldEl()
// })

// onValue(shoppingListInDB, function(snapshot) {
//     if (snapshot.exists()) {
//         let itemsArray = Object.entries(snapshot.val())
    
//         clearShoppingListEl()
        
//         for (let i = 0; i < itemsArray.length; i++) {
//             let currentItem = itemsArray[i]
//             let currentItemID = currentItem[0]
//             let currentItemValue = currentItem[1]
            
//             appendItemToShoppingListEl(currentItem)
//         }    
//     } else {
//         shoppingListEl.innerHTML = "No items here... yet"
//     }
// })

// function clearShoppingListEl() {
//     shoppingListEl.innerHTML = ""
// }

// function clearInputFieldEl() {
//     inputFieldEl.value = ""
// }

// function appendItemToShoppingListEl(item) {
//     let itemID = item[0]
//     let itemValue = item[1]
    
//     let newEl = document.createElement("li")
    
//     newEl.textContent = itemValue
    
//     newEl.addEventListener("click", function() {
//         let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        
//         remove(exactLocationOfItemInDB)
//     })
    
//     shoppingListEl.append(newEl)
// }