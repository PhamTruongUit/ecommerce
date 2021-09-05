window.onload = function() {
    listenEven()
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
    // box.style.display = 'flex'
    // box.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'
    // popUp.style.display = 'block'
    setdata(['01','02','03','02'])
    
    // fetch data cart from server
    function setdata (temp) {
        const keys = Array.from(new Set(temp))
        const count = count_obj(keys,temp)
        const server = "http://localhost:3000"
        let info = []
        keys.forEach((id)=>{
            fetch(server + '/' + id)
                .then ((rep) => rep.json())
                .then ((obj) => info.push(obj))
        })
        return addCart({ info, count })
    }

    // count obj
    function count_obj(keys,pre_keys){
        const count = []
        keys.forEach(id => {
            let sum = 0
            pre_keys.forEach(obj => {
                if (obj == id) sum++
            })
            count.push(sum)
        })
        return count
    }

    function addCart(obj) {
        console.log(obj)
        console.log(obj.info)
        console.log(obj.info[0])
        console.log(obj.info.length)
        for (let i = 0; i<obj.info.length; ++i)
            {   
                let url = obj.info[i].url
                let name = obj.info[i].name
                let price = obj.info[i].price
                let count = obj.count[i]
                render(url, name, price, count)
            }
        // debug
        // console.log(obj)
    }

    // addCart
    function render(url, name, price,count) {
        const cart = document.querySelector('.cart')
        const sum = document.querySelector('.sum')
        addElementBase()
    }

    function addElementBase(target, nameElement, attribute, style) {
        // attribute and style are array 2d
        try {
            const [parent, child] = target
            let base = document.createElement(nameElement)
            
            attribute.forEach((node) => {
                const [property, value] = node
                base.setAttribute(property, value)
            })

            style.forEach((node)=>{
                const [property, value] = node
                base.style[property] = value
            })
            parent.insertBefore(base,child)
        }
        catch (err) {
            return console.error('err render')
        } 
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