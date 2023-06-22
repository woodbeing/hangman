
let Words = JSON.parse('{ "Countries": [ "Argentina", "Bulgaria", "Chile", "Denmark", "Egypt", "Finland", "Greece", "Hungary", "Iceland", "Japan", "Kuwait", "Luxembourg", "Morocco", "Niger", "Oman", "palestine", "Qatar", "Romania", "Sweden", "Tunisia", "Uganda", "Vietenam", "Yemen", "Zambia" ], "Animals": [ "Ant", "Bat", "Camel", "Deer", "Eagle", "Flamingo", "Goose", "Horn Shark", "Iguana", "Jaguar", "Koala", "Lion", "Mole", "Nautilus", "Owl", "Pigeon", "Quahog Clam", "Red Fox", "Shark", "Tiger Shark", "Viper", "Whale Shark", "Yak", "Zebra" ], "Object": [ "Woman" ] }')
let buttons = document.querySelectorAll('.Letter')

let seconds = 0
let minutes = 0
let timerstarted = false
let Interval

function selectCateg(){
    switch(Math.floor(Math.random() * 3)){
        case 0:
            document.querySelector('.category').innerText += ' Country'
            return Words.Countries;
        case 1:
            document.querySelector('.category').innerText += ' Animal'
            return Words.Animals;
        case 2:
            document.querySelector('.category').innerText += ' Object'
            return Words.Object;
    }
}

let categ = selectCateg()
let index = Math.floor(Math.random() * categ.length)
let word = categ[index].toUpperCase()
let errors = 0

for(let item of word) {
    let parent = document.querySelector('.answer')
    if(item == ' '){
        let child = document.createElement('div')
        child.classList = 'answerletter revealed'
        child.innerText = ' '
        parent.appendChild(child)
    }
    else{
        let child = document.createElement('div')
        child.classList = 'answerletter'
        parent.appendChild(child)
    }
}

function disableButton(item){
    item.addEventListener('click', (e) => {
        if(!timerstarted) {
            timerstarted = true
            Interval = setInterval(starttimer, 1000)
        }
        item.disabled = true
        if(word.search(e.target.value) === -1){
            errors++
            document.querySelector('img').src = `Images/Hangman-${errors}.png`
            if(errors == 6){
                document.querySelectorAll('.errors')[1].innerText = `You lost! The word is : ${word}`
                buttons.forEach((item) => {
                    item.disabled = true
                })
                clearInterval(Interval)
                document.addEventListener('keypress', (e) => {
                    if(e.code == 'Space' || e.code == 'Enter') location.reload()
                })
            }
            document.querySelectorAll('.errors')[0].innerText = `Errors : ${errors}`
            return;
        }
        let answers = document.querySelectorAll('.answerletter')
        for(let letter in word){
            if(e.target.value == word[letter]){
                answers[letter].innerText = e.target.value
                answers[letter].classList = 'answerletter revealed'
            }
        }
        if(document.querySelectorAll('.revealed').length === word.length){
            document.querySelectorAll('.errors')[1].innerText = 'You Win!'
            buttons.forEach((item) => {
                item.disabled = true
            })
            clearInterval(Interval)
            document.addEventListener('keypress', (e) => {
                if(e.code == 'Space' || e.code == 'Enter') location.reload()
            })
        }
    })
}

buttons.forEach((item) => disableButton(item))

document.addEventListener('keypress', (event) => {
    buttons.forEach((item) => {
        if(event.code == `Key${item.value}`){
            item.click()
        }
    })
})

function starttimer(){
    seconds++
    if(seconds == 60){
        minutes++
        seconds = 0
    }
    if(seconds < 10){
        document.querySelector('.timer').innerText = `0${minutes}:0${seconds}`
        return;
    }
    document.querySelector('.timer').innerText = `0${minutes}:${seconds}`
}