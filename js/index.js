/* Переменные */

const refs = {
    totalBalance: document.querySelector('.total__balance'),
    totalMoneyIncome: document.querySelector('.total__money-income'),
    totalMoneyExpenses: document.querySelector('.total__money-expenses'),
    historyList: document.querySelector('.history__list'),
    form: document.querySelector('#form'),
    operationName: document.querySelector('.operation__name'),
    operationAmount: document.querySelector('.operation__amount'),
};
const amountSpanMinus = refs.totalMoneyExpenses.querySelector('span');
const amountSpanPlus = refs.totalMoneyIncome.querySelector('span');
let balanceValue = 0;
let counterValue = 0;
let dataBase = [];

refs.historyList.addEventListener('click', removeItems)
function removeItems(event)  {
    if(event.target.className !== "history_delete"){
        return;
    }
    
    event.target.parentNode.remove();
    
    dataBase = [...dataBase.reduce((acc, el) =>{
        if (el.id === event.target.dataset.id) {
            if(el.amount < 0){
        
                amountSpanMinus.textContent = Number(amountSpanMinus.textContent) -  (el.amount);
            }else{

                amountSpanPlus.textContent = Number(amountSpanPlus.textContent) - (el.amount);
            }
        
            refs.totalBalance.firstChild.textContent = balanceValue -= el.amount;
            
            
        }else{
            acc.push(el)
            
        }
        return  acc;
    },[])];
    localStorage.setItem('dataBase', JSON.stringify(dataBase))
}
// Слушаем сабмит

refs.form.addEventListener('submit', event => {
    event.preventDefault();

    const nameValue = refs.operationName.value;
    const amountValue = Number(refs.operationAmount.value);

    if (!nameValue && !amountValue) {
        return;
    }

    const operation = {
        id: generateId(),
        description: nameValue,
        amount: amountValue,
    };

    dataBase.push(operation);

    // init();
    renderOperation(operation);
    localStorage.setItem('dataBase', JSON.stringify(dataBase))

    
    refs.form.reset();
});

const renderOperation = operation => {
    const className =
        operation.amount < 0 ? 'history__item-minus' : 'history__item-plus';

        ollBallance(operation);

    const listItem = document.createElement('li');
    listItem.classList.add('history__item');
    listItem.classList.add(className);
    listItem.insertAdjacentHTML(
        'beforeend',
        `${operation.description}<span class="history__money">${operation.amount}  &#8372;</span> <button class="history_delete" data-id="${operation.id}">X</button>`,
    );
    refs.historyList.appendChild(listItem)
};

function ollBallance(operation) {


    if(operation.amount < 0){

        amountSpanMinus.textContent = Number(amountSpanMinus.textContent) +  (operation.amount);
    }else{

        amountSpanPlus.textContent = Number(amountSpanPlus.textContent) + (operation.amount);
    }

    refs.totalBalance.firstChild.textContent = balanceValue += operation.amount;
} 



function generateId() {
    return Math.round(Math.random() * 1e8).toString(16);
}
StoragePrint()

function StoragePrint() {
   const saveData = localStorage.getItem('dataBase');
   if(saveData){
    dataBase.push(...JSON.parse(saveData));
    dataBase.map(renderOperation);
   }

}