const smothLinkElems = document.querySelectorAll("a[href^='#']")

smothLinkElems.forEach(link=>{
    link.addEventListener("click",(event)=>{
        event.preventDefault();
        const  id = link.getAttribute("href").substring(1)
        document.getElementById(id).scrollIntoView({
            behavior:"smooth"
        })
    })
})