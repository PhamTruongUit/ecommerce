window.onload = function() {

    fetchData()

    function fetchData() {
        const server = "http://localhost:3000/info"
            fetch (server)
            .then ((rep) => rep.json())
            .catch ((err) => console.error('Disconnected from server'))  
            .then ((obj) => renderData(obj))
    }
    function renderData(obj) {
        const parent = document.querySelector('.content-wrapper')
        for (let val in obj) {
            const htmls = `
            <div class="container" id="${obj[val].id}">
                <img class="bookImg" src="${obj[val].url}" alt="" >
                <main class="bookName text">${obj[val].name}</main>
                <p class="bookPrice text">Giá: ${obj[val].price}</p>
                <button class="buyButton text" type="buttonsubmit">Chọn mua</button>
            </div>`
            parent.insertAdjacentHTML('beforeend',htmls) 
        }
        mainEvent()
    }

    function mainEvent(){
        const temp = []
        const buyButton = document.querySelectorAll('.buyButton')
        const shoppingButton = document.querySelector('.shoppingButton')
        const popUp = document.querySelector('.popUp')
        const box = document.querySelector('.box')
        // add obj
        buyButton.forEach((e)=> {
            e.addEventListener('click', function() {
                const id = e.parentElement.id
                temp.push(id)
            })  
        })
        // cart-shop
        shoppingButton.addEventListener('click',function() {
            box.style.display = 'flex'
            box.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'
            popUp.style.display = 'block'
            setdata(temp)
        })
    }
    function popupEvent() {
        const increase = document.querySelectorAll('.increase')
        const decrease = document.querySelectorAll('.decrease')
        const popUp = document.querySelector('.popUp')
        const box = document.querySelector('.box')
        const closeButton = document.querySelector('.closeButton')
        // close pop-up
        closeButton.addEventListener('click',function() {
            box.style.display = 'none'
            box.style.backgroundColor = 'none'
            popUp.style.display = 'none'
            const list = document.querySelector('.sum').parentElement.children
            for (let i = 0; i < list.length-1; i++) {
                list[i].remove()}
        })
        // change value count
        increase.forEach((e)=> {
            e.addEventListener('click',function() {
                const id = e.parentElement.parentElement.parentElement.id
                fixdata(id, 'increase')
            })  
        })
        decrease.forEach((e)=> {
            e.addEventListener('click',function() {
                const id = e.parentElement.parentElement.parentElement.id
                fixdata(id, 'decrease')
            })    
        })
    }
    function setdata (temp) {
        const keys = Array.from(new Set(temp)) // id sp
        const count = count_obj(keys,temp) // count sp
        const info_sp = []
        keys.forEach(function (id) {
            const obj = document.getElementById(id)
            const url = obj.children[0].attributes["src"].value
            const name = obj.children[1].innerText
            const price = obj.children[2].innerText.split(' ')[1]
            const sp = {id: id, url : url, price: price, name: name, count: count[id]}
            renderCart(sp)
            info_sp.push(sp)
        })
        calculate_price()
    }
    // count obj
    function count_obj(keys,pre_keys){
        const count = {}
        keys.forEach(id => {
            let sum = 0
            pre_keys.forEach(obj => {
                if (obj == id) sum++
            })
            count[id] = sum
        })
        return count
    }

    function renderCart(obj) {
        const parent = document.querySelector('.cart')
        const child = document.querySelector('.sum')
        const base = document.createElement('tr')
                base.setAttribute('id',`c${obj.id}`)
                base.classList.add('scrollable')
        const htmls =`<td>
                        <div class = 'boxsp'>
                            <img class = 'imgsp' src="${obj.url}">
                            <div class = 'name infosp'>${obj.name}</div>
                        </div>
                    </td>
                    <td>
                        <div class = 'infosp'>
                            ${obj.price}
                        </div>
                    </td>
                    <td>
                        <div class = 'infosp'>
                            <button class = "decrease">-</button>
                            <div>${obj.count}</div>
                            <button class = "increase">+</button>
                        </div>
                    </td>
                    <td>
                        <div class = 'calculated infosp'>
                            ${obj.price * obj.count}
                        </div>
                    </td>`
        base.innerHTML = htmls
        parent.insertBefore(base,child)
    }

    function calculate_price() {
        const price = document.getElementById('price')
        const calculated = document.querySelectorAll('.calculated')
        let sum = 0
        calculated.forEach((a)=>sum+=Number(a.innerText))
        price.innerHTML = `<b>${sum}</b>` 
        popupEvent()
    }
    // remove, add and subtract with default value = 1
    function fixdata(id, type = '') {
        const obj = document.getElementById(id)
        const current_obj = obj.children[2].children[0].children[1]
        const price_obj = obj.children[1]
        const sum_obj = obj.children[3] 
        const price = document.getElementById('price')

        if (type === 'increase')
        {
            current_obj.innerText = Number(current_obj.innerText) + 1
            price.innerHTML = `<b>${Number(price.innerText) + Number(price_obj.innerText)}</b>`
        }
        else if (type === 'decrease')
        {
            if (current_obj.innerText > 1) {
                current_obj.innerText = Number(current_obj.innerText) - 1
            }
            else {
                obj.remove()
            }
            price.innerHTML = `<b>${Number(price.innerText) - Number(price_obj.innerText)}</b>`
        }
        sum_obj.innerHTML = `<div class = 'calculated infosp'>
                            ${Number(current_obj.innerText) * Number(price_obj.innerText)}
                        </div>`
    }
}