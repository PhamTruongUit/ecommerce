window.onload = function() {
    
    let pre_keys = []

    const server = "http://localhost:3000"
    const buyButton = document.querySelectorAll('.buyButton')
    const closeButton = document.querySelector('.closeButton')
    const shoppingButton = document.querySelector('.shoppingButton')
    const popUp = document.querySelector('.popUp')
    const box = document.querySelector('.box')

    // fetch data from server
    function getdata (pre_keys) {
        let info = []
        let keys = Array.from(new Set(pre_keys))
        keys.forEach((id)=>{
            const obj = server + '/' + id
            fetch(obj)
                .then ((rep) => rep.json())
                .then ((obj) => info.push(obj))
        })
        let count = count_obj(keys,pre_keys)
        return { info, count }
    }

    // count obj
    function count_obj(keys,pre_keys){
        let count = []
        keys.forEach(id => {
            let sum = 0
            pre_keys.forEach(obj => {
                if (obj == id) sum++
            })
            count.push(sum)
        })
        return count
    }

    // add obj
    buyButton.forEach((e)=> {
        e.addEventListener('click',() => {
            const id = e.parentElement.id
            pre_keys.push(id)
        })  
    })

    //cart-shop
    shoppingButton.addEventListener('click',() => {
        box.style.display = 'flex'
        box.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'
        popUp.style.display = 'block'
        console.log(getdata(pre_keys))
    })

    //close pop-up
    closeButton.addEventListener('click',() => {
        box.style.display = 'none'
        box.style.backgroundColor = 'none'
        popUp.style.display = 'none'
    })

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