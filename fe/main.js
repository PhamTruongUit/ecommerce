window.onload = function() {

    fetchData()

    function fetchData() {
        const server = "http://localhost:3000/info"
        fetch (server)
            .then ((rep) => rep.json())
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
        listenEven()
    }

    function listenEven(){
        const temp = []
        const buyButton = document.querySelectorAll('.buyButton')
        const closeButton = document.querySelector('.closeButton')
        const shoppingButton = document.querySelector('.shoppingButton')
        const popUp = document.querySelector('.popUp')
        const box = document.querySelector('.box')
        const increase = document.querySelectorAll('.increase')
        const decrease = document.querySelectorAll('.decrease')
        // add obj
        buyButton.forEach((e)=> {
            e.addEventListener('click',() => {
                const id = e.parentElement.id
                temp.push(id)
            })  
        })
        // cart-shop
        shoppingButton.addEventListener('click',() => {
            box.style.display = 'flex'
            box.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'
            popUp.style.display = 'block'
            setdata(temp)
        })
        // close pop-up
        closeButton.addEventListener('click',() => {
            box.style.display = 'none'
            box.style.backgroundColor = 'none'
            popUp.style.display = 'none'
        })
        // change value count
        increase.forEach((e)=> {
            e.addEventListener('click',() => {
                const id = e.parentElement.parentElement.parentElement.id
                temp.push(id.slice(1))
                fixdata(temp)
            })  
        })
        decrease.forEach((e)=> {
            e.addEventListener('click',() => {
                const id = e.parentElement.parentElement.parentElement.id
                temp.push(id)
                fixdata(temp)
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
        console.log('keys: ', keys)
        console.log('count: ', count)
        console.log(info_sp)
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
        price.innerText = `${sum}đ` 
        listenEven()
    }
    // remove, add and subtract with default value = 1
    function calculated(obj, type = 'none') {
        if (type === 'none') return null
        else if (type === 'increase')
        {

        }
        else if (type === 'decrease')
        {

        }
    }
}