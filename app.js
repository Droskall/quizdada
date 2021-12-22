$(document).ready(function(){
    "use strict";

    let questions = [{
        question: "Quelle est la voiture que Sam et Dean conduisent dans la series Supernatural?",
        choices: ['Dodge Charger', 'Chevrolet Impala 67', 'Chevrolet Impala 66', 'Ford Mustang', 'Renaut 305'],
        correctAnswer: 1,
    }, {
        question: "Que faut il pour eloigner les fantomes",
        choices: ["Poivre", "Fourchette", "Sel", "RKO"],
        correctAnswer: 2
    }, {
        question: "Qui est le sorceleur ?",
        choices: ['Yenefer', 'Geralt', 'Nicolas Sarkozy', 'Triss', 'Jaskier'],
        correctAnswer: 1
    }, {
        question: "Quel est le nombre de saisons de SNK?",
        choices: ["15", "4", "6", "55", "8"],
        correctAnswer: 1
    }, {
        question: "Combien de jeu The Witcher il y a eu ?",
        choices: ["10", "2", "1", "3", "6"],
        correctAnswer: 3
    }, {
        question: "Quelle est le nom du finish du catcheur Brock Lesnar ?",
        choices: ["Spear", "619", "RKO", "AA", "F5"],
        correctAnswer: 4
    }, {
        question: "Quelle titre Roman Reigns n'as jamais eu ?",
        choices: ["NXT Championship", "Universal Championship", "WWE Championship", "Intercontinental Champion", "USA Champion"],
        correctAnswer: 0
    }, {
        question: "Mon reve est ",
        choices: ['De conduire une Impala', 'De devenir un Sorcelleur', 'De devenir un catcheur', 'De voir Wrestlemania'],
        correctAnswer: 3
    }, {
        question: "Qui a battu la Streak de l'Undertaker à Wrestlemania 30 ? ",
        choices: ['Triple H', 'Brock Lesnar', 'Edge', 'Seth Rollins', 'Kane'],
        correctAnswer: 1
    }, {
        question: "Qui est le heros principal de SNK",
        choices: ['Armin', "Mikasa", 'Eren', 'Reiner', 'Sieg'],
        correctAnswer: 2
    }, {
        question: "Une epée de sorceleur pour tuer les monstres est faite ?",
        choices: ['Acier', 'Cuivre', "Argent", "Mouse"],
        correctAnswer: 2
    }, {
        question: "Comment s appelle le devoreur des mondes dans Skyrim ?",
        choices: ['Bibendum Chamallow', 'Emanuel', 'COVID', 'Alduin'],
        correctAnswer: 3
    }, {
        question: "Comment s'appelle le profeseur dans 'Assassination Classroom' ?",
        choices: ['Koro', 'Erwin', 'Michel', 'Mickey'],
        correctAnswer: 0
    }, {
        question: "On va voir si vous avez une bonne memoire. Dans la premiere question qui conduit la voiture ?",
        choices: ['Geralt et Yennefer', 'Dean et Samuel', "Dominick et Sam", "Dean et Sam"],
        correctAnswer: 3
    }, {
        question: "Dans le jeu Red dead Redemption 2 qui est le heros principal ?",
        choices: ['Dutch', 'Micha', 'John', 'Arthur'],
        correctAnswer: 3
    }, {
        question: "Dans GTA V qui sont les trois braqueurs ?",
        choices: ['Tretre , Michael, Lamar', 'Trevor , Michael , Lester', 'Trevor , Michael , Franklin', 'Martin , Nikos , Franklin'],
        correctAnswer: 2
    }, {
        question: "Qui a le pus long regne de champion NXT ?",
        choices: ['Fin Balor', 'Adam Cole', 'Tomaso Ciampa', 'Johny Gargano'],
        correctAnswer: 1
    }, {
        question: "Qui a fait son retour sur le ring au Royal Rumbel 2020 apres 9 ans d'absence ?",
        choices: ['Edge', 'John Cena', 'Undertaker', 'Triple H'],
        correctAnswer: 0
    }, {
        question: "Comment s'appele la fille adoptive de Geralt qu'on doit retrouver dans The Witcher 3 : Wild Hunt ?",
        choices: ['Rowina', 'Mary', "Ciri", "Triss"],
        correctAnswer: 2
    }, {
        question: "Completer cette phrase ! 'JETTE UN SOUS ...'",
        choices: ['AU SORCELLEUR', 'AU IMPOTS', 'A TON DAMIEN'],
        correctAnswer: 2
    }, {
        question: "Mon pseudo Discord ('Droskall') est le meme partout (sur toutes les autres plateformes 'Xbox, Insta, Facebook ....') ?",
        choices: ['OUI', 'NON'],
        correctAnswer: 1
    }, {
        question: "Comment s appelle mon chat ?",
        choices: ['Alduin', 'PoPy', 'Julian Alfred Pankratz de Lettenhove', 'Iris'],
        correctAnswer: 3
    }, {
        question: "Mon arme prefere pour me battre est ?",
        choices: ['Eppe', 'Hache', 'Dague', 'Lance', 'Arbalette'],
        correctAnswer: 0
    },{
        question: "Suis-je un fou ?",
        choices: ['Oui totalement', 'Non tkt pas'],
        correctAnswer: 0
    },{
        question: "BONUS! C'est quoi ma chanson preferer ;) (Atention Piege) ?",
        choices: ['Carry On My Wayward Son', 'Eye of Storm', 'Toss A Coin To Your Witcher', 'Night Moves'],
        correctAnswer: 0
    }
    ];

    let questionCounter = 0;
    let selections = [];
    let quiz = $('.content');

    function displayNext() {
        quiz.fadeOut(function() {
            $('#question').remove();

            if(questionCounter < questions.length){
                let nextQuestion = createQuestionElement(questionCounter);
                quiz.append(nextQuestion).fadeIn();
                if (!(isNaN(selections[questionCounter]))) {
                    $('input[value='+selections[questionCounter]+']').prop('checked', true);
                }

                if(questionCounter === 1){
                    $('#prev').show();
                } else if(questionCounter === 0){

                    $('#prev').hide();
                    $('#next').show();
                }
            }
            else {
                let scoreElem = displayScore();
                quiz.append(scoreElem).fadeIn();
                $('#next').hide();
                $('#prev').hide();
                $('#start').show();
            }
        });
    }


    displayNext();

    $('#next').on('click', function (e) {
        e.preventDefault();

        if(quiz.is(':animated')) {
            return false;
        }

        choose();

        if (isNaN(selections[questionCounter])) {
            $('#warning').text('Veullez choisir une proposition !');
        }

        else {
            questionCounter++;
            displayNext();
            $('#warning').text('');
        }
    });

    $('#prev').on('click', function (e) {
        e.preventDefault();

        if(quiz.is(':animated')) {
            return false;
        }
        choose();
        questionCounter--;
        displayNext();
    });

    $('#start').on('click', function (e) {
        e.preventDefault();

        if(quiz.is(':animated')) {
            return false;
        }
        questionCounter = 0;
        selections = [];
        displayNext();
        $('#start').hide();
    });

    function createQuestionElement(index) {
        let qElement = $('<div>', {
            id: 'question'
        });

        let header = $('<h2>Question ' + (index + 1) + ':</h2>');
        qElement.append(header);

        let question = $('<p>').append(questions[index].question);
        qElement.append(question);

        let radioButtons = createRadios(index);
        qElement.append(radioButtons);

        let warningText = $('<p id="warning">');
        qElement.append(warningText);

        return qElement;

    }

    function createRadios(index) {
        let radioList = $('<ul>');
        let item;
        let input = '';
        for (let i = 0; i < questions[index].choices.length; i++) {
            item = $('<li>');
            input = '<input type="radio" name="answer" value=' + i + ' />';
            input += questions[index].choices[i];
            item.append(input);
            radioList.append(item);
        }
        return radioList;
    }

    function choose() {
        selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }

    function displayScore() {
        let score = $('<h3>',{id: 'question'});

        let numCorrect = 0;
        for (let i = 0; i < selections.length; i++) {
            if (selections[i] === questions[i].correctAnswer) {
                numCorrect++;
            }
        }

        let percentage = numCorrect / questions.length;
        if (percentage >= 0.9){
            score.append('Incroiyable! Tu as eu ' + numCorrect + ' sur ' +
                questions.length + ' bonne reponses');
        }

        else if (percentage >= 0.7){
            score.append('Bien joue! Tu as eu ' + numCorrect + ' sur ' +
                questions.length + ' bonne reponses');
        }

        else if (percentage >= 0.5){
            score.append('Tu as eu ' + numCorrect + ' sur ' +
                questions.length + ' bonne reponses');
        }

        else {
            score.append('Tu n as eu que ' + numCorrect + ' sur ' +
                questions.length + ' Voulez-vous recomencez?');
        }
        return score;
    }
});
