import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import { getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'


const appSettings = {
    databaseURL : "your firebase realtime database link goes here"

}

const app = initializeApp(appSettings)
const dataBase = getDatabase(app)
const itemsInput = ref(dataBase, "shopping-items")

onValue(itemsInput, function(snapshot) {

    if (snapshot.exists()) {
        let shopListArray = Object.entries(snapshot.val())

        console.log(shopListArray)
    
        itemsList.innerHTML = ''
    
        for(let i = 0; i<shopListArray.length; i++) {
            let currentItem = shopListArray[i]
    
            renderItems(currentItem)
        }

    } else {
        itemsList.innerHTML = "<p>" + "No items here" + "</p>"
    }

})

const inputEl = document.getElementById("item-input")
const addBtn = document.getElementById("add-btn")
let itemsList = document.getElementById("items-list")


addBtn.addEventListener("click", function () {
    let shopItem = inputEl.value

    push(itemsInput, shopItem)

    clearInput()

})

function renderItems (shopItem) {
    let shopItemID = shopItem[0]
    let shopItemValue = shopItem[1]

    let newEl = document.createElement('li')
    newEl.textContent = shopItemValue
    
    itemsList.append(newEl)

    newEl.addEventListener("click", function() {
        let exactItem = ref(dataBase, `shopping-items/${shopItemID}`)

        remove(exactItem)
    })
}

function clearInput () {
    inputEl.value = ''
}

