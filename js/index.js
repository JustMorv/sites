document.addEventListener("DOMContentLoaded", () => {

    //    -------------------------- Header__Logo auto Text!-----------------------//

    const headerLogo = document.querySelector(".header__logo")
    const textTitle = "SiteShops!"
    let ind = 1
    const startText = () => {
        headerLogo.innerHTML = textTitle.slice(0, ind)
        ind++
        if (ind > textTitle.length) {
            setTimeout(() => {
                ind = 0
            }, 1000);
        }

    }
    setInterval(startText, 300)
    //    -------------------------- Header__nav Burger-----------------------//
    const burger = document.querySelector(".nav_burger")
    const nav = document.querySelector(".header__nav ul")
    const links = document.querySelectorAll(".header__nav li")
    const openNavs = document.querySelector(".header__nav li ul")
    const navButtonClick = document.querySelector(".header__nav .products")
    function headerBurger() {
        navButtonClick.addEventListener("click", () => {
            openNavs.classList.toggle("toggle");
        })
        document.addEventListener("click", (event) => {
            if (event.target.classList.contains("nav_burger") || event.target.classList.contains("line")) {
                nav.classList.toggle("active")
                burger.classList.toggle("toggle")
                links.forEach((link, index) => {
                    if (link.style.animation) {
                        link.style.animation = ''
                    }
                    else {
                        link.style.animation = `navBurger .2s ease forwards ${index / 7 + 0.3}s`
                    }
                })
            }

        })
    }

    headerBurger()
    //    --------------------------slider_-----------------------//
    const slides = document.querySelectorAll(".item");

    let slideIndex = 1;
    showSlides(slideIndex);

    const plusSlide = () => {
        showSlides(slideIndex += 1);
    }

    const minusSlide = () => {
        showSlides(slideIndex -= 1);
    }

    const currentSlide = (n) => {
        showSlides(slideIndex = n);
    }
    let count = 1

    setInterval(plusSlide, 8000)
    function showSlides(n) {

        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }
        slides.forEach((elem) => {
            elem.style.display = "none"
        })

        if (slides[slideIndex - 1] === undefined) {
            return false;

        }
        else {
            slides[slideIndex - 1].style.display = "block";
        }

    }
    if (document.querySelector(".bottonPrev") == null) {
        return false
    }
    else {
        document.querySelector(".bottonPrev").addEventListener("click", minusSlide)
    }

    document.querySelector(".bottonNext").addEventListener("click", plusSlide)



    // _____________________SCroll sitebar________//
    let sitebar = document.querySelector(".sitebar")
    let sticky = sitebar.offsetTop
    function sticky_scroll() {
        if (window.pageYOffset > sticky) {
            sitebar.classList.add("sitebar_sticky")
        }
        else {
            sitebar.classList.remove("sitebar_sticky")
        }
    }
    window.addEventListener("scroll", sticky_scroll)



    // linksCardCLICK

    const navigationLink = document.querySelectorAll(".navigation_item")
    const productsCardContainer = document.querySelector(".cardrender")

    const getCard = async () => {
        const result = await fetch("db/db.json")
        if (!result.ok) {
            throw "it doesn't work" + result.status
        }
        return await result.json()
    }

    const cteareCard = (optionCArd) => {
        const card = document.createElement("div")
        card.className = "productsCard"
        card.innerHTML = `
    <div class="product__container">
        <div class="container__card_product">
            <h2 class="product__name">${optionCArd.title}</h2>
            <a class="product__buy js-modal-open" href="#modal-1">купить</a>
            <a href="#modal-2" class="product__info js-modal-open">Подробно</a>
            <div class="product__circle"></div>
            <div class="product__Price0nlyModal" style="display: none;">${optionCArd.price}</div>
            <img class="product__img" src="${optionCArd.img}" alt="">
        </div>
</div>`
        return card

    }

    const renderCartClick = (data) => {
        productsCardContainer.textContent = ""
        const cards = data.map(cteareCard)
        productsCardContainer.append(...cards)

        document.body.classList.add("show-goods")
        cardt3D()

    }


    // getCard().then(renderCartClick)


    // filter
    const filterCards = (field, value) => {
        getCard()
            .then((data) => {
                const filteredCard = data.filter((card) => {
                    return card[field] === value
                })
                return filteredCard
            })
            .then(renderCartClick)
    }

    // вывод по клику етих, как их там... карточек! 

    navigationLink.forEach((item) => {
        productsCardContainer.style.animation = ""
        item.addEventListener("click", (event) => {
            event.preventDefault()
            const field = item.dataset.field
            const value = item.textContent
            filterCards(field, value)
            productsCardContainer.style.animation = "fade 1.5s"

        })
    })



})
