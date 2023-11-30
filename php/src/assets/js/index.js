const steps= Array.from(document.querySelectorAll('form .step'));
const nextBtn= document.querySelectorAll('form .next-step');
const prevBtn= document.querySelectorAll('form .prev-step');
const form= document.querySelector('form');
const completionMessage = document.getElementById('sucess-box');
const campos = document.querySelectorAll('.required');
const spans = document.querySelectorAll('.span-required');
const userName = document.getElementById('userName');
const userLastName = document.getElementById('userLastName');
const userBirth = document.getElementById('userBirth');
const userPhone = document.getElementById('userPhone');
const userPhoneConfirmation = document.getElementById('userPhoneConfirm');
const userMail = document.getElementById('userEmail');
const userMailConfirmation = document.getElementById('userEmailConfirm');
const userPassword = document.getElementById('userPassword');
const userPasswordConfirmation = document.getElementById('userPasswordConfirm');
const EmailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[\w-]{2,4}$/;
let index = 0;

userName.addEventListener('input',() => Validator(0));
userLastName.addEventListener('input',() => Validator(1));
userPhone.addEventListener('input',() => Validator(3));
userPhoneConfirmation.addEventListener('input',() => Validator(4));
userMail.addEventListener('input',() => Validator(5));
userMailConfirmation.addEventListener('input',() => Validator(6));
userPassword.addEventListener('input',() => Validator(7));


nextBtn.forEach(button=>{
    button.addEventListener('click', (e) =>{
        if(isBroken()){
            alert('Revise suas informações');
        }else{
        changeStep('next');
        }
    });
});

prevBtn.forEach(button=>{
    button.addEventListener('click', (e) =>{
        changeStep('prev');
    })
});

form.addEventListener('submit', (e)=>{
    const inputs = [];
    form.querySelectorAll('input').forEach(input=>{
        const {name, value} = input;
        inputs.push({name, value})
    })
    console.log(inputs)
    form.reset();
    let index =0;
    const active = document.querySelector('form .step.active');
    index = steps.indexOf(active);
    steps[index].classList.remove('active');
    steps[4].classList.add('active');

});

function isBroken(){
    if(index == 0){
        if(Validator(0)){
            return true;
        }else if(Validator(1)){
            return true;
        }else if(Validator(2)){
            return true;
        }
        return false;
    }else if(index ==1){
        if(Validator(3)){
            return true;
        }else if(Validator(4)){
            return true;
        }
        return false;
    }else if(index==2){
        if(Validator(5)){
            return true;
        }else if(Validator(6)){
            return true;
        }
        return false;
    }
    else if(index==3){
        if(Validator(7)){
            return true;
        }else if(Validator(8)){
            return true;
        }
        return false;
    }

     return false;   
}

function Validator(x){
    if(x == 0){
        if(campos[x].value.length < 3 || campos[x].value.trim() === ''){
            setError(x);
            return true;
        }else{
           removeError(x)
           return false;
        }
    }
    else if(x==1){
        if(campos[x].value.length < 1 || campos[x].value.trim() === ''){
            setError(x);
            return true;
        }else{
           removeError(x)
           return false;
        }
    }
    else if(x==2){
        if(campos[x].value.length < 1 || campos[x].value.trim() === ''){
            setError(x);
            return true;
        }else{
           removeError(x)
           return false;
        }
    }
    else if(x==3){
        if(campos[x].value.length < 10 || campos[x].value.length > 11 || campos[x].value.trim() === ''){
            setError(x);
            return true;
        }else{
           removeError(x)
           return false;
        }
    }
    else if(x == 4){
        if(campos[x-1].value != campos[x].value || campos[x].value.trim() === ''){
            setError(x);
            return true;
       }else{
            removeError(x);
            return false;
       }
    }
    else if(x == 5){
        if(!EmailRegex.test(campos[x].value) || campos[x].value.trim() === ''){
            setError(x);
            return true;
        }else{
            removeError(x);
            return false;
        }
    }
    else if(x == 6){
        if(campos[x-1].value !== campos[x].value || campos[x].value.trim() === ''){
            setError(x);
            return true;
        }else{
            removeError(x);
            return false;
        }
    }
    else if(x == 7){
        if(campos[x].value.length <4 || campos[x].value.trim() === ''){
            setError(x);
            return true;
        }else{
            removeError(x);
            return false;
        }
    }
    else if(x == 8){
        if(campos[x-1].value !== campos[x].value || campos[x].value.trim() === ''){
            setError(x);
            return true;
        }else{
            removeError(x);
            return false;
        }
    }

}


function setError(index){
    campos[index].style.border = '2px solid #e63636'
    spans[index].style.display = 'flex';
};

function removeError(index){
    campos[index].style.border = ''
    spans[index].style.display = 'none';
};


function changeStep(btn){
    
    const active = document.querySelector('form .step.active');
    index = steps.indexOf(active)
    steps[index].classList.remove('active');
    if(btn == 'next'){
        index ++;
    }else if(btn == 'prev'){
        index --;
    }
    steps[index].classList.add('active');
    console.log(index);
}
    
