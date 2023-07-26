const newItems = [...products];

const prodContainer = document.querySelector('.products-container');
const companies = document.querySelector('.companies');


const result = (query)=>{
    const unique = new Set();
    const filtered = newItems.filter((filtItem)=>{
        const {title, company, image, price}=filtItem;
        unique.add(company);
        if(query === 'all')
        return filtItem;
        else if(company.includes(query) || title.includes(query))
        return filtItem;
        else
        return 0;
    });
    const mapped = filtered.map((mapItem)=>{
        const {title, company, image, price}=mapItem;
        return `<article class="product">
        <img src=${image} alt="" class="product-img img">
        <footer>
          <h5 class="product-name">${title}</h5>
          <span class="product-price">$${price}</span>
        </footer>
      </article>`
    }).join('');
    if(mapped.length === 0)
    return `<h6>Sorry, no product matched your search</h6>  `

    return mapped;
};

const unique = [`<button class="company-btn" data-value ="all">all</button>`,...new Set(newItems.map((item)=>{
    return `<button class="company-btn" data-value = "${item.company}">${item.company}</button>`
}))].join('');

document.addEventListener('DOMContentLoaded',()=>{
    companies.innerHTML = unique;
    prodContainer.innerHTML = result('all');

    const btns = [...document.querySelectorAll('.company-btn')];
    btns.forEach((item)=>{
        item.addEventListener('click',(event)=>{
            prodContainer.innerHTML = result(event.currentTarget.dataset.value);
            input.value = ' ';
        });
    });

    const form = document.querySelector('.input-form');
    const input = document.querySelector('.search-input');
    form.addEventListener('keyup',(event)=>{
        const value = input.value;
        prodContainer.innerHTML = result(value.toLowerCase());
    });
});