import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './style.css' // если у тебя есть свои стили

function basketCount() {

  let getProductsStorage = JSON.parse(localStorage.getItem(`productStorage`))
  let basketCount = document.querySelector(`.count`)
  basketCount.textContent = getProductsStorage.length

}

basketCount()



async function getProducts() {

  try {

    const data = await fetch(`https://dummyjson.com/products?limit=0`)
    const res = await data.json()
    let resProd = res.products

    function renderCards(array) {

      let wrapper = document.querySelector(`.cards-wrapper`)
      wrapper.innerHTML = ''

      array.forEach((e, index) => {

        let card = document.createElement(`div`)
        card.classList = `card`

        card.innerHTML = `
       <img src="${e.images[0]}" class="card-img-top" style="width:200px; margin:0 auto;" alt="...">

       <div class="card-body">
         <h5 class="card-title">${e.title}</h5>
         <p class="card-text text-truncate" style="width:100%; ">${e.description}</p>
         <p class="card-text text-truncate">${e.category}</p>
         <button id="buyBtn" data-index="${index}" class="btn btn-primary">Buy</button>
       </div>
      `

        wrapper.append(card)
      });

    }

    renderCards(resProd)

    let buyBtn = document.querySelectorAll(`#buyBtn`)
    console.log(buyBtn);

    buyBtn.forEach(btn => {
      btn.addEventListener(`click`, () => {

        let getProductsStorage = JSON.parse(localStorage.getItem(`productStorage`))
        console.log(getProductsStorage);

        basketCount()
        
        let productIndex = +btn.getAttribute(`data-index`)
        let buyedProduct = resProd[productIndex]
        console.log(buyedProduct);


        getProductsStorage.push(buyedProduct)


        localStorage.setItem(`productStorage`, JSON.stringify(getProductsStorage))


      })
    })

    let searchInput = document.getElementById(`searchInput`)
    let searchBtn = document.getElementById(`searchBtn`)

    searchBtn.addEventListener(`click`, () => {

      let searchInputValue = searchInput.value.toLowerCase().trim()

      let filter = res.products.filter(fil => fil.title.toLowerCase().trim().includes(searchInputValue) || fil.category.toLowerCase().trim().includes(searchInputValue))
      console.log(filter);


      renderCards(filter)
    })
  }

  catch (err) {
    console.log(err);

  }

}

getProducts()