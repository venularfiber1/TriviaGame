$(document).ready(function () {

    $("#timer").hide();
    $("#start").on('click', game.start);
    $(document).on('click', '.option', game.check);

})

var game = {
    right: 0,
    wrong: 0,
    unanswered: 0,
    set: 0,
    time: 20,
    starttime: false,
    timer: '',
    //object for questions
    questions: {
        one: 'What is the surname given to bastards born in Dorne?',
        two: 'The Mountainis the nickname for which character?',
        three: 'Who is Lord Commander of the Kingsguard at the beginning of Game of Thrones?',
        four: 'Who was Margaery Tyrells first husband?',
        five: 'How many times has Sansa Stark been married?'
    },
    //object of choices
    choice: {
        one: ['rivers', 'sand', 'snow', 'water'],
        two: ['Oberyn Martell', 'Sandor Clegane', 'Gerold Clegane', 'Gregor Clegane'],
        three: ['Ser Jaime Lannister', 'Ser Barristan Selmy', 'Ser Loras Tyrell', 'Ser Jeor Mormont'],
        four: ['Renly Baratheon', 'Joffrey Baratheon', 'Stannis Baratheon', 'Tommen Baratheon'],
        five: ['one', 'two', 'three', 'four'],
    },
    //object of answers
    answers: {
        one: 'sand',
        two: 'Gregor Clegane',
        three: 'Ser Barristan Selmy',
        four: 'Renly Baratheon',
        five: 'two',
    },
    //start function
    start: function () {
        //reseting the variables
        game.set = 0;
        game.right = 0;
        game.wrong = 0;
        game.unanswered = 0;
        clearInterval(game.timer);


        $('#triviagame').show();
        $('#answer').html('');
        $('#timer').text(game.time);
        $('#start').hide();
        $('#timer').show();

        game.next();

    },

    //function for the timer
    run: function () {

        if (game.time > -1 && game.set < Object.keys(game.questions).length) {
            $('#timer').text(game.time);
            game.time--;
            if (game.time === 4) {
                $('#timer').addClass('last-seconds');
            }
        }

        else if (game.time === -1) {
            game.unanswered++;
            clearInterval(game.timer);
            resultId = setTimeout(game.results, 3000);
            $('#answer').html('<h3>Time Ran out: ' + Object.values(game.answers)[game.set] + '</h3>');
        }

        else if (game.set === Object.keys(game.questions).length) {


            $('#answer')
                .html('<h3>Game Over!</h3>' +
                    '<p>Right: ' + game.right + '</p>' +
                    '<p>Wrong: ' + game.wrong + '</p>' +
                    '<p>Unaswered: ' + game.unanswered + '</p>' +
                    '<p>Play again!</p>');
            $('#triviagame').hide();
            $('#start').show();
        }

    },

    //function to check the answers
    check: function () {
        var result;
        var answer = Object.values(game.answers)[game.set];
        if ($(this).text() === answer) {
            $(this).addClass('btn-success').removeClass('btn-info');
            game.right++;
            clearInterval(game.timer);
            result = setTimeout(game.results, 3000);
            $('#answer').html('<h3>Right Answer!</h3>');
        }

        else {

            $(this).addClass('btn-danger').removeClass('btn-info');
            game.wrong++;
            clearInterval(game.timer);
            result = setTimeout(game.results, 3000);
            $('#answer').html('<h3>Nice Try! ' + answer + '</h3>');
        }

    },

    //function for next question
    next: function () {
        game.time = 20;
        $('#timer').removeClass('last-seconds');
        $('#timer').text(game.time);

        if (!game.starttime) {
            game.timer = setInterval(game.run, 1000);
        }
        var questionContent = Object.values(game.questions)[game.set];
        $('#question').text(questionContent);
        var questionOptions = Object.values(game.choice)[game.set];
        $.each(questionOptions, function (index, key) {
            $('#yourchoice').append($('<button class="option btn btn-info btn-lg">' + key + '</button>'));
        })

    },

    //function to remove old questions and answers and go to next question
    results: function () {
        game.set++;
        $('.option').remove();
        $('#answer h3').remove();
        game.next();
    }

}