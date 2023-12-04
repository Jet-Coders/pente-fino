class MobileNavBar {
    constructor(mobileMenu, navList, navLinks, mobileNav) {
        this.mobileMenu = document.querySelector(mobileMenu);
        this.navList = document.querySelector(navList);
        this.navLinks = document.querySelectorAll(navLinks);
        this.mobileNav = document.getElementById(mobileNav);
        this.activeNav = "active-nav";
        this.activeMenu = "active-menu";
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.navList.classList.toggle(this.activeNav);
        this.mobileMenu.classList.toggle(this.activeMenu);
        this.mobileNav.classList.toggle('scale-y-0');
    }

    addClickEvent() {
        this.mobileMenu.addEventListener('click', this.handleClick);

        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.handleClick();
            });
        });
    }

    init() {
        if (this.mobileMenu) {
            this.addClickEvent();
        }
        return this;
    }
}

const mobileNavbar = new MobileNavBar(
    '.mobile-menu',
    '.nav-list',
    '.nav-list li',
    'mobileNav'
);

mobileNavbar.init();

const steps= Array.from(document.querySelectorAll('form .step'));
const nextBtn= document.querySelectorAll('form .next-step');
const prevBtn= document.querySelectorAll('form .prev-step');
const form= document.querySelector('form');
const completionMessage = document.getElementById('sucess-box');
const campos = document.querySelectorAll('.required');
const spans = document.querySelectorAll('.span-required');
const userPasswordConfirmation = document.getElementById('userPasswordConfirm');
const EmailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[\w-]{2,4}$/;
const PhoneRegex = /^\([1-9]{2}\) (?:[2-8]|9[0-9])[0-9]{3}\-[0-9]{4}$/
let index = 0;

campos[0].addEventListener('input',() => Validator(0));
campos[1].addEventListener('input',() => Validator(1));
campos[3].addEventListener('input',() => Validator(3));
campos[4].addEventListener('input',() => Validator(4));
campos[5].addEventListener('input',() => Validator(5));
campos[6].addEventListener('input',() => Validator(6));
campos[7].addEventListener('input',() => Validator(7));


nextBtn.forEach(button=>{
    button.addEventListener('click', (e) =>{
        if(isBroken()){
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
        phoneNumberFormatter(campos[x]);
        if(!PhoneRegex.test(campos[x].value)/*campos[x].value.length < 10 || campos[x].value.length > 11 */|| campos[x].value.trim() === ''){
            setError(x);
            return true;
        }else{
           removeError(x)
           return false;
        }
    
    }
    else if(x == 4){
        phoneNumberFormatter(campos[x]);
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

function formatPhoneNumber(value) {
    if (!value) return value;
  
    // Remover caracteres não numéricos
    const phoneNumber = value.replace(/[^\d]/g, '');
  
    if(phoneNumber.length ===11){
        return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7)}`;
    }else if(phoneNumber.length ===10){
        return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 6)}-${phoneNumber.slice(6)}`;
    }else{
        return value;
    }

  }
  
  function phoneNumberFormatter(x){
    const formattedInputValue = formatPhoneNumber(x.value);
    x.value = formattedInputValue;
  }
