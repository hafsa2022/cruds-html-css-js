//
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood='create';
let tmp;

function getTotal(){
    if(price.value != ''){
        let res = (+price.value + +taxes.value + +ads.value ) - +discount.value ;
        total.innerHTML=res;
        total.style.background='#040';
    }
    else{
        total.innerHTML='';
        total.style.background="rgb(143, 23, 23)";

    }
}

//create product
let dataPro;
if(localStorage.product!=null)
{
    dataPro=JSON.parse(localStorage.product);
}
else{
    dataPro=[];
}

submit.onclick=function(){
let newProd={
    title:title.value.toLowerCase(),
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value.toLowerCase(),
}
if(title.value !='' && price.value!='' && category.value!='' && count.value<100){
    if(mood === 'create'){
        if(count.value>1){
            for(let i=0;i<count.value;i++){
                dataPro.push(newProd);
            }
        }else{
            dataPro.push(newProd);
        }
    }else{
        dataPro[tmp]=newProd;
        mood='create';
        count.style.display='block';
        submit.innerHTML='Create'
    }
    clearData();
}

// save in local storage :
localStorage.setItem('product',JSON.stringify(dataPro));
readData();
}
//clear data :
function clearData(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
}
// read:
function readData(){
getTotal();
let table='';
for(let i=0 ;i<dataPro.length ;i++ ){
    
    table +=`
    <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick='updateData(${i})' id="update">Update</button></td>
        <td><button onclick="deleteData(${i})"id="delete">Delete</button></td>
    </tr> 
    `
}
document.getElementById('tbody').innerHTML=table;
if(dataPro.length>0){
    let btndelAll=document.getElementById('btndelAll')
    btndelAll.innerHTML=`<button onclick="deleteAll()">Delete All (${dataPro.length})</button>`
}
else{
    btndelAll.innerHTML='';
}
}
readData();
//delete
function deleteData(i){
dataPro.splice(i,1);
localStorage.product=JSON.stringify(dataPro);
readData();
}
//delete ALL 
function deleteAll(){
localStorage.clear();
dataPro.splice(0);
readData()
}
 
function updateData(i){
    title.value=dataPro[i].title;
    price.value=dataPro[i].price;
    taxes.value=dataPro[i].taxes;
    ads.value=dataPro[i].ads;
    discount.value=dataPro[i].discount;
    getTotal();
    count.style.display='none';
    category.value=dataPro[i].category;
    submit.innerHTML='Update';
    mood='update';
    tmp=i;
    scroll({
        top:0,
        behavior:"smooth"
    })

}
// search:

let searchMood="title"
function getSearch(id){
let search=document.getElementById("search");
if(id=='searchTitle'){
    searchMood="title";
}else{
    searchMood="category";
}
search.placeholder='search by '+searchMood;
search.focus();
search.value='';
readData();
}

function searchData(value){
let table='';
for(let i=0;i<dataPro.length;i++){
    if(searchMood=='title'){
    if(dataPro[i].title.includes(value.toLowerCase())){
        table +=`
    <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick='updateData(${i})' id="update">Update</button></td>
        <td><button onclick="deleteData(${i})"id="delete">Delete</button></td>
    </tr> 
    `
    }

}else{
    for(let i=0;i<dataPro.length;i++){
        if(dataPro[i].category.includes(value.toLowerCase())){
            table +=`
        <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick='updateData(${i})' id="update">Update</button></td>
            <td><button onclick="deleteData(${i})"id="delete">Delete</button></td>
        </tr> 
        `
        }
    }
}
}
document.getElementById('tbody').innerHTML=table;
}
//clean data
