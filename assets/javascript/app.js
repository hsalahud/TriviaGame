count = 10
let i = 0
//let j = 0
let timer
//let seenQ = []
let qSet = []
let randomNumber
//let randomChoice = []
//let choice
let wins = 0
let losses = 0
let missed=0
let isRun = false
let questionsAvailable = true
//let timerFlow



//Object of questions and their options and original styling.
const questions = [
    {
        0: 'Which is the largest city in Morocco?',
        options: [
            "Rabat",
            "Fes",
            "Casablanca",
            "Sale"

        ],
        answer: 'Casablanca',
        id:'op2',
        style: "choices waves-effect waves-light btn-large cyan"
    },
    {
        1: 'In which English county is Stonehenge?',
        options: [
            "Somerset",
            "Cumbria",
            "Herefordshire",
            "Wiltshire"
        ],
        answer: "Wiltshire",
        id:'op3',
        style: "choices waves-effect waves-light btn-large cyan"
    },
    {
        2: 'The following Spanish provinces are located in the northern area of Spain except:',
        options: [
            "Murcia",
            "Asturias",
            "Navarre",
            "Léon"

        ],
        answer: 'Murcia',
        id:'op0',
        style: "choices waves-effect waves-light btn-large cyan"
    },
    {
        3: 'Which of these countries is located the FURTHEST away from the South China Sea?',
        options: [
            "Malaysia",
            "Bangladesh",
            "Vietnam",
            "Philippines"

        ],
        answer: "Bangladesh",
        id:'op1',
        style: "choices waves-effect waves-light btn-large cyan"
    },
    {
        4: 'What tiny principality lies between Spain and France?',
        options: [
            "Liechtenstein",
            "Monaco",
            "Andorra",
            "San Marino"

        ],
        answer: "Andorra",
        id:'op2',
        style: "choices waves-effect waves-light btn-large cyan"
    },
    {
        5: 'Which Canadian province has Charlottetown as its capital?',
        options: [
            "Saskatchewan",
            "Northwest Terrirories",
            "Ontario",
            "Prince Edward Island"
        ],
        answer: 'Prince Edward Island',
        id:'op3',
        style: "choices waves-effect waves-light btn-large cyan"
    },
    {
        6: 'Which one of these countries borders with Poland?',
        options: [
            "Lithuania",
            "France",
            "Norway",
            "Netherlands"

        ],
        answer: "Lithuania",
        id:'op0',
        style: "choices waves-effect waves-light btn-large cyan"
    },
    {
        7: 'What is the capital city of New Zealand?',
        options: [
            "Auckland",
            "Wellington",
            "Christchurch",
            "Melbourne"

        ],
        answer: "Wellington",
        id:'op1',
        style: "choices waves-effect waves-light btn-large cyan"
    },
    {
        8: 'What is the fifth largest country by area?',
        options: [
            "United States",
            "Australia",
            "Brazil",
            "India"

        ],
        answer: 'Brazil',
        id:'op2',
        style: "choices waves-effect waves-light btn-large cyan"
    },
    {
        9: 'What continent is the country Lesotho in?',
        options: [
            "Asia",
            "South America",
            "Europe",
            "Africa"
        ],
        answer: "Africa",
        id:'op3',
        style: "choices waves-effect waves-light btn-large cyan"
    },
]



const qAvailable = () => {

    if (wins + losses + missed === questions.length) {
        questionsAvailable = false
    }
    else {
        questionsAvailable = true
    }

}

const genNum = () => {
    randomNumber = Math.floor(Math.random() * questions.length)
}

//function to select a question
const selectQuestion = () => {

    if (questionsAvailable === true) {
        genNum()
        while (qSet.indexOf(randomNumber) !== -1) {
            genNum()
            if (qSet.indexOf(randomNumber) === -1) {
                break
            }
        }

        document.querySelector('#question').textContent = questions[randomNumber][randomNumber]
        document.querySelector('#questionPage').style.display = "block"

        for (let j = 0; j < questions[randomNumber].options.length; j++) {
            document.getElementById(`op${j}`).textContent = questions[randomNumber].options[j]
            document.getElementById(`op${j}`).className = questions[randomNumber].style

        }
        qSet.push(randomNumber)
        starter()
        console.log(questions[randomNumber][randomNumber])
        console.log(questions[randomNumber].answer)
    }

    else {
        document.querySelector('#questionPage').style.display = "none"
        document.querySelector('.total').style.display = "block"
        document.querySelector('#scoreC').textContent = `Total Correct: ${wins}`
        document.querySelector('#scoreW').textContent = `Total Wrong: ${losses}`
        document.querySelector('#scoreM').textContent = `Total Missed: ${missed}`
        stopper()

    }

}

//Toggle true or false if a choice has been selected. This prevents making multiple choices in one question.
let selected = false
const selectedChoice = () => {
    if (document.querySelectorAll('.red').length >= 1 || document.querySelectorAll('.green').length >= 1) {
        selected = true

    } else {
        selected = false

    }
}

//See if a choice is right or wrong and prevent multiple selections
const options = document.querySelectorAll('.choices')

options.forEach(function (choice) {

    choice.onclick = e => {
        selectedChoice()
        if (selected === false && count > 0) {

            if (e.target.innerText === questions[randomNumber].answer.toUpperCase()) {
                e.target.className = 'choices waves-effect waves-light btn-large green'
                wins++
                qAvailable()
                nextQ()

            } else {
                e.target.className = 'choices waves-effect waves-light btn-large red'
                document.querySelector(`#${questions[randomNumber].id}`).className='choices waves-effect waves-light btn-large green'

                losses++
                qAvailable()
                nextQ()

            }

        } else {
            null

        }

    }

})

//Pause timer, reset the timer and move on to the next question
const nextQ = () => {
    stopper()
    setTimeout(_ => {
        resetter()
        selectQuestion()
    }, 2000)
}

//function to run when timer reaches 0.
const noTime = () => {
    stopper()
    resetter()
    document.querySelector('#questionPage').style.display = "none"
    document.querySelector('#answer').textContent=`The Correct Answer Is: ${questions[randomNumber].answer}`
    document.querySelector('.outOfTime').style.display = 'block'
    missed++
    qAvailable()

    setTimeout(_ => {
        document.querySelector('.outOfTime').style.display = 'none'
        selectQuestion()

    }, 2000)

}


//reset timer method
const resetter = _ => {
    count = 10
    document.querySelector('#timer').textContent = '00:10'
}

//stop timer method
const stopper = _ => {
    if (isRun) {
        clearInterval(timer)
        count = 10
        isRun = false
    }
}


//Start timer method. If timer reaches 0, we display a time out message
const starter = _ => {

    if (!isRun) {
        isRun = true
        timer = setInterval(() => {
            count--
            document.querySelector('#timer').textContent = compTime()
            if (count === 0) {
                noTime()
            }

        }, 1000)

    }

}

//Calculations for minutes/seconds to be shown in the timer node
const compTime = _ => {
    let minutes = Math.floor(count / 60)
    let seconds = count % 60
    minutes = `${minutes}`.length < 2 ? `0${minutes}` : `${minutes.toString()[0]}${minutes.toString()[1]}`
    seconds = `${seconds}`.length < 2 ? `0${seconds}` : `${seconds.toString()[0]}${seconds.toString()[1]}`
    return `${minutes}:${seconds}`
}



//Display question after clicking play

document.querySelector('#play').addEventListener('click', e => {
    document.querySelector('#intro').style.display = "none"
    document.querySelector('#questionPage').style.display = "block"
    selectQuestion()
})

const reset = ()=>{
    document.querySelector('.total').style.display = "none"
    document.querySelector('#intro').style.display = "block"
    resetter()
    wins=0
    losses=0
    missed=0
    qSet=[]
    isRun=false
    questionsAvailable=true
    console.log('hello')
}
