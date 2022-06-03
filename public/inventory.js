// EDIT INVENTORY ITEM WORKFLOW
const editButtons = document.querySelectorAll('.editInventoryItem')
const invItems = document.querySelectorAll('.inventoryItem')

for (let i=0; i<editButtons.length; i++) {
    editButtons[i].addEventListener('click', _ => {
        const value = editButtons[i].getAttribute('value')
        fetch(`/farm-inventory/${value}`)
            .then(res => {
                if (res.ok) return res.json()
            })
            .then(response => {
                const item = response
                invItems[i].innerHTML =
                `
                <form>
                    <label for="editProductName">Name: </label>
                    <input type="text" name="editProductName" value="${item.productName}"><br>

                    <label for="editProductType">Type: </label>  
                    <select name="editProductType" class="editProductType">
                        <option value="">-- Select a Product Type --</option>
                        <option value="produce" class="editproduce">Produce</option>
                        <option value="dairy" class="editdairy">Dairy</option>
                        <option value="meat" class="editmeat">Meat</option>
                        <option value="other" class="editother">Other</option>
                    </select><br>

                    <label for="editProductQty">Qty: </label>
                    <input type="text" name="editProductQty" value="${item.productQuantity}">

                    <select name="quantityType" class="editQuantityType">
                        <option value="">-- Select a Quantity Type --</option>
                        <option value="pounds" class="editpounds">Pounds</option>
                        <option value="kilograms" class="editkilograms">Kilograms</option>
                        <option value="bunches" class="editbunches">Bunches</option>
                        <option value="bags" class="editbags">Bags</option>
                        <option value="each" class="editeach">Each</option>
                    </select><br>
                    <input class="editSubmitButton" type="button" value="Submit"><a href="http://localhost:3000">Cancel</a>
                </form>
                `
                const types = [
                    'produce',
                    'dairy',
                    'meat',
                    'other'
                ]
                types.forEach(type => {
                    if(item.productType === type) {
                        const selected = document.querySelector(`.edit${type}`)
                        selected.setAttribute('selected', 'true')
                    }
                })
                const quantityTypes = [
                    'pounds',
                    'kilograms',
                    'bunches',
                    'bags',
                    'each'
                ]
                quantityTypes.forEach(type => {
                    if(item.quantityType === type) {
                        const selected = document.querySelector(`.edit${type}`)
                        selected.setAttribute('selected', 'true')
                    }
                })
                const editSubmitButton = document.querySelector('.editSubmitButton')
                const productTypeSel = document.querySelector('.editProductType')
                const quantityTypeSel = document.querySelector('.editQuantityType')
                editSubmitButton.addEventListener('click', _ => {
                    const formData = {
                        id: value,
                        productName: document.querySelector('input[name="editProductName"').value.toLowerCase(),
                        productType: productTypeSel.options[productTypeSel.selectedIndex].text.toLowerCase(),
                        productQuantity: document.querySelector('input[name="editProductQty"').value.toLowerCase(),
                        quantityType: quantityTypeSel.options[quantityTypeSel.selectedIndex].text.toLowerCase(),
                    }
                    fetch('/farm-inventory', {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData)
                    })
                    .then(response => {
                        window.location.href = '/'
                    })
                    .catch(err => console.error(err))
                })
            })
    })
}



// DELETE INVENTROY ITEM WORKFLOW
const deleteButtons = document.querySelectorAll('.deleteInventoryItem')
for (let i=0; i<deleteButtons.length; i++) {
    const currentDeleteButton = deleteButtons[i]
    currentDeleteButton.addEventListener('click', _ => {
        const valueToDelete = currentDeleteButton.getAttribute('value')
        fetch('/farmer-inventory', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id: valueToDelete})
        })
        .then(response => {
            window.location.href = '/'
        })
        .cathch(err => console.error(err))
    })
}