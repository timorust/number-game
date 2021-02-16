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


const playRec = (sound) => {
    const userLang = $langInBoard.value;
    $audioRecorder.src = soundsUrls[userLang][sound];
    $audioRecorder.play();
};


const soundsBox = (num) => {

    playRec ('where');

    setTimeout(() => {
        playRec(num);
    },1500)

}


const userFind = ($event) => {

    const isLiElement = $event.target.localName === 'li';
    if (!isLiElement) { return false; }

    const userChoice = $event.target.dataset.id;
    const boardCorrect = $board.dataset.find;

    const isPlayButt = $event.target.dataset.id === 'play-sound';
    if (isPlayButt) {
        return soundsBox(boardCorrect);
    }

    if (userChoice === boardCorrect) {
        $board.classList.add('win');

        $audioRecorder.src = soundsUrls.win;
        $audioRecorder.play();


        setTimeout(() => {
            $board.classList.remove('win');
            start();
        },1500);

    }else {
        $board.classList.add('wrong');

        $audioRecorder.src = soundsUrls.wrong;
        $audioRecorder.play();

        setTimeout(() => {
            playRec(userChoice);
        },1100)

        setTimeout(() => {
            $board.classList.remove('wrong');
        },1300);
    }
};



const start = () => {
    $board.innerHTML = ' ';
    const random = Math.floor(Math.random() * 10);
    $board.dataset.find = random;

    soundsBox(random);

    const data = lottery(numRunning);

    data.forEach((num) => {
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




const lottery = (numbers) => {
let count = numbers.length;
while (count > 0) {
    let i = Math.floor(Math.random() * count);
    count--;
    let temp = numbers[count];
    numbers[count] = numbers[i];
    numbers[i] = temp;
}
return numbers;
}


start();





$board.addEventListener('click', userFind);