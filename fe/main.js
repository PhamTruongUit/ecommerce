window.onload = function() {
    listenEven()
    let bool = false
    function listenEven(){
        const temp = []
        const buyButton = document.querySelectorAll('.buyButton')
        const closeButton = document.querySelector('.closeButton')
        const shoppingButton = document.querySelector('.shoppingButton')
        const popUp = document.querySelector('.popUp')
        const box = document.querySelector('.box')

        // add obj
        buyButton.forEach((e)=> {
            e.addEventListener('click',() => {
                const id = e.parentElement.id
                temp.push(id)
            })  
        })

        //cart-shop
        shoppingButton.addEventListener('click',() => {
            box.style.display = 'flex'
            box.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'
            popUp.style.display = 'block'
            // bool === false ? setdata(temp) : null
            setdata(temp)
        })

        //close pop-up
        closeButton.addEventListener('click',() => {
            box.style.display = 'none'
            box.style.backgroundColor = 'none'
            popUp.style.display = 'none'
        })
    }

    //test
    const popUp = document.querySelector('.popUp')
    const box = document.querySelector('.box')
    box.style.display = 'flex'
    box.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'
    popUp.style.display = 'block'
    setdata(['01','02','03','02'])

    function setdata (temp) {
        const keys = Array.from(new Set(temp))
        const count = count_obj(keys,temp)
        getdata(keys, count)
    }

    function getdata (keys, count) {
        const server = "http://localhost:3000"
        const promise = new Promise(function (resolve, reject) {
            resolve()
            reject()
        })
        promise
            .then(
                keys.forEach((id)=>{
                    fetch(server + '/' + id)
                        .then ((rep) => rep.json())
                        .then (function (rep) {
                            rep['count'] = count[id]
                            return rep
                        })
                        .then ((obj) => renderCart(obj))        
                }))
            .catch (console.error('disconected server'))
            // .finally (calculate_price())  
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
                base.classList.add(`row_${obj.id}`)
                base.classList.add('scrollable')
        const htmls =`<td>
                        <div class = 'boxsp'>
                            <img class = 'imgsp' src="${obj.url}">
                            <div class = 'name infosp'>${obj.name}</div>
                        </div>
                    </td>
                    <td>
                        <div class = 'price infosp'>
                            ${obj.price}
                        </div>
                    </td>
                    <td>
                        <div class = 'count infosp'>
                            <button class = "increase">-</button>
                            <div>${obj.count}</div>
                            <button class = "decrease">+</button>
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
        const price = document.querySelector('.price')
        const calculated = document.querySelectorAll('.calculated')
        let sum = 0
        calculated.forEach((a)=>{sum+=Number(a.innerText); console.log(sum)})
        price.innerText = `${sum}đ` 
    }
    // remove, add and subtract with default value = 1
    function fix(obj, id, type) {
        if (!type) return false
        else
            for (let i = 0; i<obj.info.length; ++i)
                if (obj.info[i].id == id)
                    {
                        if (type === 'remove')
                        {
                            let info = obj.info.slice(0,i).concat(obj.info.slice(i+1))
                            let count = obj.count.slice(0,i).concat(obj.count.slice(i+1))
                            return { info , count } 
                        }
                        else if (type === 'increase')
                        {
                            obj.count[i]++
                            return obj
                        }
                        else if (type === 'decrease')
                        {
                            obj.count[i]--
                            if (obj.count[i] === 0) 
                                return fix(obj, id, type = 'remove')
                            else return obj 
                        }
                    }     
    }
}