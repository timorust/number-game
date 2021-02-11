const $board = document.getElementById('board'),
      $langInBoard = document.getElementById('language'),
      numRunning = [0,1,2,3,4,5,6,7,8,9];


// const audioRecord = document.createElement('audio');
// audioRecord.type = 'audio/mpeg';
// audioRecord.id = 'audio';
// document.body.appendChild(audioRecord);

// const audioRecord = document.getElementById('audio');
// const soundsUrl = {
//      ''
// }


const $audioRecorder = document.getElementById('audio');
const soundsUrls = {
    wrong: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/wronganswer.mp3',
    win: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/rightanswer.mp3',
    he: {
        where: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_where.mp3',
        0: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_0.mp3',
        1: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_1.mp3',
        2: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_2.mp3',
        3: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_3.mp3',
        4: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_4.mp3',
        5: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_5.mp3',
        6: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_6.mp3',
        7: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_7.mp3',
        8: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_8.mp3',
        9: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_9.mp3'
    },
    en: {
        where: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_where.en.mp3',
        0: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_0.en.mp3',
        1: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_1.en.mp3',
        2: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_2.en.mp3',
        3: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_3.en.mp3',
        4: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_4.en.mp3',
        5: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_5.en.mp3',
        6: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_6.en.mp3',
        7: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_7.en.mp3',
        8: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_8.en.mp3',
        9: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_9.en.mp3'
    }
}

const playRec = (lang, sound) => {
    $audioRecorder.src = soundsUrls[lang][sound];
    $audioRecorder.play();
};


const playSounds = (num) => {
    playRec($langInBoard.value, 'where');

    setTimeout(() => {
        playRec($langInBoard.value, num);
    },1500)
}

const createNumAndStar = () => {
    $board.innerHTML = ' ';
    const randomNum = Math.floor(Math.random() * 10);
    $board.dataset.find = randomNum;

    playSounds(randomNum);

    const currentAnswer = lottery(numRunning);
    currentAnswer.forEach((num) => {
        const liElement = document.createElement('li');
        liElement.innerText = num;
        liElement.dataset.id = num;
        $board.appendChild(liElement);

    });

    const playButt = document.createElement('li');
    playButt.classList.add('start-play');
    playButt.dataset.id = 'play-sound';
    $board.appendChild(playButt);
}

const lottery = (numArr) => {
let cnt = numArr.length;
while (cnt > 0) {
    let i = Math.floor(Math.random() * cnt);
    cnt--;
    let temp = numArr[cnt];
    numArr[cnt] = numArr[i];
    numArr[i] = temp;
}
return numArr;
}


createNumAndStar();


const selectUser = ($event) => {
    const isLiElement = $event.target.nodeName === 'LI';
    if (!isLiElement) {
        return false;
    }

    const userChoice = $event.target.dataset.id;
    const boardFind = $board.dataset.find;

    const isPlayButt = $event.target.dataset.id === 'play-sound';

if (isPlayButt) {
    return playSounds(boardFind);
}


    if (userChoice === boardFind) {
        $board.classList.add('win')


        $audioRecorder.src = soundsUrls.win;
        $audioRecorder.play();


        // setTimeout(() => {
        //     playRec($langInBoard.value, userChoice)
        // },1500);

        setTimeout(() => {
            $board.classList.remove('win');
            createNumAndStar();

        },2000)

    }else {
        $board.classList.add('wrong');

        $audioRecorder.src = soundsUrls.wrong;
        $audioRecorder.play();

        setTimeout(() => {
            playRec($langInBoard.value, userChoice);
        },1500)

        setTimeout(() => {
            $board.classList.remove('wrong');

        },2000);
    }
}


$board.addEventListener('click', selectUser);