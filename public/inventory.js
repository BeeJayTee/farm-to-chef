const editButtons = document.querySelectorAll('.editInventoryItem')
const invItems = document.querySelectorAll('.inventoryItem')

for (let i=0; i<editButtons.length; i++) {
    editButtons[i].addEventListener('click', _ => {
        const value = editButtons[i].getAttribute('value')
        fetch('/farm-inventory', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                _id: value
            })
        })
            .then(res => {
                if (res.ok) return res.json()
            })
            .then(response => {
                const item = response
                invItems[i].innerHTML =
                `
                <form>
                    <label for="editProductName">Name: </label><input type="text" name="editProductName" value="${item.productName}"><br>
                    <label for="editProductType">Type: </label>  
                    <select name="editProductType" id="editProductType">
                        <option value="">-- Select a Product Type --</option>
                        <option value="produce" id="editproduce">Produce</option>
                        <option value="dairy" id="editdairy">Dairy</option>
                        <option value="meat" id="editmeat">Meat</option>
                        <option value="other" id="editother">Other</option>
                    </select><br>
                    <label for="editProductQty">Qty: </label><input type="text" name="editProductQty" value="${item.productQuantity}">
                    <select name="quantityType" id="editQuantityType">
                        <option value="">-- Select a Quantity Type --</option>
                        <option value="pounds" id="editpounds">Pounds</option>
                        <option value="kilograms" id="editkilograms">Kilograms</option>
                        <option value="bunches" id="editbunches">Bunches</option>
                        <option value="bags" id="editbags">Bags</option>
                    </select> 
                </form>
                `
                const types = [
                    '-- Select a Product Type --',
                    'produce',
                    'dairy',
                    'meat',
                    'other'
                ]
                types.forEach(type => {
                    if(item.productType === type) {
                        const selected = document.querySelector(`#edit${type}`)
                        selected.setAttribute('selected', 'true')
                    }
                })
            })
    })
}