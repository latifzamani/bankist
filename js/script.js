
alert("Name:Password--->al:1111|sb:2222|fk:3333|jm:4444|🥰")
//Data
const account1 = {
    owner: 'Abdul Latif',
    movements: [230, 4000, 1200, -1400, 300, -2650, -2220, 5500, -1000, 400, -2300, ],
    interestRate: 1.2, //%
    pin: 1111,
};
const account2 = {
    owner: 'Saber Khan',
    movements: [2230, 400, -200, 1400, -3330, 2650],
    interestRate: 1.1, //%
    pin: 2222,
};
const account3 = {
    owner: 'Farhad Karimi',
    movements: [-2220, 5500, -1000, 400, -2300, 250],
    interestRate: 1.6, //%
    pin: 3333,
};
const account4 = {
    owner: 'Jamshid Mashekhi',
    movements: [1130, -1000, 1200, -1100, -2300, 650],
    interestRate: 1.4, //%
    pin: 4444,
};
const accounts = [account1, account2, account3, account4];
//Elements
const containerMov = document.querySelector('#movement');
const containerApp = document.querySelector('#app');
const balanceVal = document.querySelector('#balanceValue');
const inValue = document.querySelector('#inValue');
const outValue = document.querySelector('#outValue');
const interestValue = document.querySelector('#interestValue');
const inputConfirmUser = document.querySelector('#confirmUser')
const inputConfirmPin = document.querySelector('#confirmPin')
const inputLoan = document.querySelector('#loanAmount');
const inputTransferTo = document.querySelector('#transferTo');
const inputTransferAmount = document.querySelector('#amount');
const inputName = document.querySelector('#userName');
const inputPin = document.querySelector('#userPin');
const btnTransfer = document.querySelector('#btnTransfer');
const btnCloseAccount = document.querySelector('#btncloseAccount');
const btnLogin = document.querySelector('#btnLogin');
const btnLoan = document.querySelector('#btnLoan');
const btnSort = document.querySelector('#btnSort');
const lableWelcome = document.querySelector('#welcome');
const lableBalanceDate=document.querySelector('#balanceDate');
const lableBalanceClock=document.querySelector('#balanceClock');
const lableLogOut=document.querySelector('#logoutTime');

//Functions
// ----------dispalay the movements---------
const displayMov = function (movements,sort=false) {
    const now=new Date();
const year=now.getFullYear();
const month=`${now.getMonth()+1}`.padStart(2,0);
const day=`${now.getDay()}`.padStart(2,0);
    const movSort= sort ? movements.slice().sort((a,b)=>a-b) :movements;

    containerMov.innerHTML = '';
    movSort.forEach(function (value, index) {
        const type = (value > 0) ? 'deposit' : 'withdrawal';
        const html = `
    <div id="moveRow">
        <div id="movType" class="${type}">${index+1} ${type}</div>
        <div id="movDate">${year}/${month}/${day}</div>
        <div id="movValue">${value}€</div>
        </div>
        `;
        containerMov.insertAdjacentHTML('afterbegin', html);
    });
};

// ------------change Euro to USD---------
const EroToUSD = 1.5;
const resUSD = account1.movements.map(function (mov) {
    // console.log(mov * EroToUSD);
});

// ---------create Usernames from names of users---
const creatUserNames = function (accs) {
    accs.forEach(function (acc) {
        acc.username = acc.owner //creating a new property
            .toLocaleLowerCase().split(' ').map(function (name) {
                return name[0];
            }).join('');
    });
};
creatUserNames(accounts);
// console.log(accounts);

// --------deposits and withdrawal--------
const depositValues = account1.movements.filter(function (mov) {
    return mov > 0;
});
// console.log(depositValues);
const withdrawalValues = account1.movements.filter(function (mov) {
    return mov < 0;
});
// console.log(withdrawalValues);
//------------balance Value---------
const calcBalance = function (acc) {
    acc.balance = acc.movements.reduce(function (acc, curr) {
        return acc + curr;
    }, 0);
    balanceVal.textContent = `${acc.balance.toFixed(2)} €`;
}
//-----------summary values---------
const calcSummary = function (acc) {
    const inResult = acc.movements.filter(function (mov) {
        return mov > 0;
    }).reduce(function (acc, mov) {
        return acc + mov;
    }, 0);
    inValue.textContent = `${inResult} €`;

    const outResult = acc.movements.filter(function (mov) {
        return mov < 0;
    }).reduce(function (acc, mov) {
        return acc + mov;
    }, 0);
    outValue.textContent = `${Math.abs(outResult)} €`;

    const interest = acc.movements.filter(function (mov) {
        return mov > 0;
    }).map(function (mov) {
        return (mov * acc.interestRate / 100);
    }).reduce(function (acc, mov) {
        return acc + mov;
    }, 0);
    console.log(acc.interestRate);
    interestValue.textContent = `${interest} €`
};


// ---------------update_Accounts---------------
const update = function (currentAccount) {
    //its movements
    displayMov(currentAccount.movements);
    //its balance
    calcBalance(currentAccount);
    //its summary
    calcSummary(currentAccount);
}
// ------------TimeCounter For LogOut--------
const logoutTimer=function(){ 

   const tick= function(){
        const min=String(Math.trunc(time/60)).padStart(2,0);
        const sec=String(time % 60).padStart(2,0);
        lableLogOut.textContent=`${min}:${sec}`;
        // console.log(`${min}:${sec}`);
        if(time==0){
            clearInterval(timeInter);
            //UI , Message
        lableWelcome.textContent = 'Log-in to get start';
        containerApp.style.opacity = 0;
        //clear Inputs
        inputPin.value = inputName.value = '';
        btnLoan.blur();
        }
        time--;
    };
    let time=600;
    tick();
    const timeInter=setInterval(tick,1000);

    return timeInter;
};
// logoutTimer();
// ---------------Login---------------
let currentAccount,timeInter;
// --------BalanceDate----------
const now=new Date();
const year=now.getFullYear();
const month=`${now.getMonth()+1}`.padStart(2,0);
const day=`${now.getDay()}`.padStart(2,0);
const clock=setInterval(function(){
    const now=new Date();
    const hour=`${now.getHours()}`.padStart(2,0);
    const minute=`${now.getMinutes()}`.padStart(2,0);
    const second=`${now.getSeconds()}`.padStart(2,0);
    lableBalanceClock.textContent=`${hour}:${minute}:${second}`;    
    const a=Math.trunc(Math.random()*10);
    const b=Math.trunc(Math.random()*100+100);
    const c=Math.trunc(Math.random()*100+160);
    lableBalanceClock.style.color=
    `rgb(${a},${b},${c})`;
},1000);
// console.log(Math.trunc(Math.random()*100+40));
lableBalanceDate.textContent=`${year}/${month}/${day} |`;
//-------------------
btnLogin.addEventListener('click', function (event) {
    event.preventDefault();
    console.log('Loging');
    currentAccount = accounts.find(function (acc) {
        return acc.username == inputName.value;
    });
    console.log(currentAccount);
    if (currentAccount ?.pin == Number(inputPin.value)) {
        console.log('Pin is correct');
        //UI , Message
        lableWelcome.textContent = `Welcome back, ${currentAccount.owner}`;
        containerApp.style.opacity = 100;
        //Timer
        if(timeInter)clearInterval(timeInter)
            timeInter=logoutTimer();
        //update UI
        update(currentAccount);
        //clear Inputs
        inputPin.value = inputName.value = '';
            
    } else {
        alert('Please Enter Correct Name and Pin 😊')
    }
});

// -----------Transfer Money-----------
btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();
    const amount = Number(inputTransferAmount.value);
    const receiver = accounts.find(function (acc) {
        return acc.username == inputTransferTo.value;
    })
    console.log(amount, receiver);
    if (amount > 0 && receiver && amount <= currentAccount ?.balance && receiver ?.username !== currentAccount.username) {
        currentAccount.movements.push(-amount);
        receiver.movements.push(amount);
        update(currentAccount);
    } else {
        console.log('InValid Transfer')

    }
    inputTransferAmount.value = inputTransferTo.value = ''
    btnTransfer.blur();
});

// --------------Loan------------
btnLoan.addEventListener('click', function (e) {
    e.preventDefault();
    const amount = Number(inputLoan.value);
    if (amount > 0 && currentAccount.movements.some(function (mov) {
            return mov >= amount * 0.1;
        })) {
        //add amount to movement array
        currentAccount.movements.push(amount);
        //update UI
        update(currentAccount);
        //clear inputs
        inputLoan.value = '';
        btnLoan.blur();
        console.log('Loan was successfull');
    } else {
        console.log('Loan is Invalid');
    };
})
// --------------Close_Account------------
btnCloseAccount.addEventListener('click', function (e) {
    e.preventDefault();
    if (inputConfirmUser.value == currentAccount.username && Number(inputConfirmPin.value) == currentAccount.pin) {
        console.log('Deleted.')
    } else {
        alert('Username Or Pin is incorrect.');
    };
    const index = accounts.findIndex(function (acc) {
        return acc.username == currentAccount.username;
    });
    inputConfirmUser.value = inputConfirmPin.value = '';
    //Delete Account
    accounts.splice(index, 1);
    //clear User and Pin
    //Hide UI
    containerApp.style.opacity = 0;

});
// ---------------Sortting--------------
let sortState=false;
btnSort.addEventListener('click',function(e){
e.preventDefault();
displayMov(currentAccount.movements,!sortState);
sortState=!sortState;
btnSort.blur();
console.log('Sort');

});