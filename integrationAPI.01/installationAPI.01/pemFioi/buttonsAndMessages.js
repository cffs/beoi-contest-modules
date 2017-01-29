(function() {

'use strict';

/*
 * Implementation of the displayHelper API.
 *
 * Copyright (c) 2012 Association France-ioi, MIT License http://opensource.org/licenses/MIT
 *
 * See documentation for more information.
 */

window.displayHelper = {
   loaded: false,
   timeLoaded: 0,
   checkAnswerInterval: null,
   prevAnswer: '',
   readOnly: false,
   savedAnswer: '',
   submittedAnswer: '',
   submittedScore: 0,
   hasAnswerChanged: true,
   taskSelector: '#task',
   hideValidateButton: false,
   hideRestartButton: false,
   showScore: false,
   refreshMessages: true,
   stoppedShowingResult: false,
   previousMessages: {},
   popupMessageShown: false,
   thresholdEasy: 60,
   thresholdMedium: 120,
   timeoutMinutes: 5,
   avatarType: "beaver",

   hasLevels: false,
   pointsAsStars: true, // TODO: false as default
   unlockedLevels: 3,
   neverHadHard: false,
   showMultiversionNotice: false,
   levelsScores: { easy: 0, medium: 0, hard: 0 },
   levelsRanks: { easy: 0, medium: 1, hard: 2 },
   prevLevelsScores: { easy: 0, medium: 0, hard: 0 },
   levels: ['easy', 'medium', 'hard'],
   taskLevel: '',

   formatTranslation: function(s, args) { return s.replace(/\{([^}]+)\}/g, function(_, match){ return args[match]; }); },

   languageStrings: {
      fr: {
         version: "Version",
         levelVersionName_easy: "version facile",
         levelVersionName_medium: "version moyenne",
         levelVersionName_hard: "version difficile",
         levelVersionName_easy_stars: "version à 2 étoiles",
         levelVersionName_medium_stars: "version à 3 étoiles",
         levelVersionName_hard_stars: "version à 4 étoiles",
         levelName_easy: "Facile",
         levelName_medium: "Moyen",
         levelName_hard: "Difficile",
         warningTimeout: "<p>Attention, cela fait plus de {0} minutes que vous êtes sur cette question.</p><p>Vous devriez sans doute changer de sujet, en cliquant sur le bouton tout en haut à droite.</p>",
         alright: "D'accord",
         moveOn: "Passer à la suite",
         solvedMoveOn: "Vous avez entièrement résolu cette question, passez à une autre question.",
         confirmRestart: "Êtes-vous certain de vouloir recommencer cette version ?",
         yes: "Oui",
         no: "Non",
         tryHardLevel: "Nous vous proposons d'essayer la version 4 étoiles.",
         tryMediumLevel: "Nous vous proposons d'essayer la version 3 étoiles.",
         tryNextTask: "Nous vous proposons de passer au sujet suivant. S'il vous reste du temps, vous reviendrez plus tard essayer la version suivante.",
         yourScoreIsNow: "Votre score est maintenant :",
         worseScoreStays: "C'est moins bien qu'avant ; votre score reste :",
         scoreStays: "Votre score reste le même :",
         score: "Score :",
         noPointsForLevel: "Vous n'avez pas encore obtenu de points sur cette version.",
         outOf: " sur ",
         tryToDoBetterOrChangeTask: "Essayez de faire encore mieux, ou passez à une autre question.",
         tryToDoBetterOrMoveToNextLevel: "Essayez de faire encore mieux, ou passez à une version plus difficile.",
         bestPossibleScoreCongrats: "C'est le meilleur score possible sur ce sujet ; félicitations !",
         forMorePointsMoveToNextLevel: "Pour obtenir plus de points, passez à une version plus difficile.",
         youDidBetterBefore: "Vous aviez fait mieux avant.",
         scoreStays2: "Votre score reste le même.",
         reloadBestAnswer: "Rechargez votre meilleure réponse.",
         validate: "Valider",
         restart: "Recommencer",
         harderLevelSolved: "Attention : vous avez déjà résolu une version plus difficile. Vous ne pourrez pas gagner de points supplémentaires avec cette version.",
         showLevelAnyway: "Voir quand même",
         scoreObtained: "Score obtenu :",
         hardVersionTakesTime: "Résoudre une {0} peut vous prendre beaucoup de temps ; songez en priorité à répondre aux questions en {1} pour gagner des points rapidement.",
         illKeepThatInMind: "J'y prendrai garde",
         harderLevelAvailable: "Notez que pour cette question, vous pouvez résoudre directement une version plus difficile que celle-ci.",
         lockedLevel: "Cette version est verrouillée. Résolvez la précédente pour l'afficher !",
         gradeThisAnswer: "Évaluer cette réponse",

         // The following messages are used for tasks with no feedback
         saveAnswer: "Enregistrer votre réponse",
         answerSavedModifyOrCancelIt: "Votre réponse a été enregistrée. Vous pouvez la modifier, ou bien {0} et recommencer.",
         cancelIt: "l'annuler",
         warningDifferentAnswerSaved: "Attention : une réponse différente est enregistrée.",
         youMay: "Vous pouvez {0}.",
         reloadIt: "la recharger",
         saveThisNewAnswer: "Enregistrer cette nouvelle réponse",

         gradingInProgress: "Évaluation en cours",
         scoreIs: "Votre score est de :",
         point: "point",
         points: "points",
         // The following messages are used when viewing tasks after contest is over
         contestOverScoreStays: "Le concours étant terminé, votre réponse n'est pas enregistrée et votre score reste de :",
         scoreWouldBecome: "Avec cette réponse, votre score serait :",
         reloadValidAnswer: "Rechargez la réponse validée.",
         contestOverAnswerNotSaved: "Le concours est terminé : votre réponse n'est pas enregistrée.",
         scoreWouldStay: "Avec cette réponse, votre score resterait le même :",
         answerNotSavedContestOver: "Le concours étant terminé, votre réponse n'a pas été enregistrée. Vous pouvez {0}.",
         reloadSubmittedAnswer: "recharger la réponse que vous avez soumise",
         difficultyWarning: "<strong>Attention :</strong> résoudre cette version prend du temps.<br/>Vous pourrez résoudre bien plus rapidement les versions 2 et 3 étoiles d'autres sujets."
      },
      en: {
         version: "Version",
         levelVersionName_easy: "easy version",
         levelVersionName_medium: "medium version",
         levelVersionName_hard: "hard version",
         levelVersionName_easy_stars: "2 stars version",
         levelVersionName_medium_stars: "3 stars version",
         levelVersionName_hard_stars: "4 stars version",
         levelName_easy: "Easy",
         levelName_medium: "Medium",
         levelName_hard: "Hard",
         warningTimeout: "<p>Warning, it has been more than {0} minutes since you started working on this task.</p><p>You should probably switch to a diffrent task, by clicking on the button on the top-right.</p>",
         alright: "Alright",
         moveOn: "Move on",
         solvedMoveOn: "You solved this task completely, move on to another task.",
         confirmRestart: "Are you sure you want to restart this version?",
         yes: "Yes",
         no: "No",
         tryHardLevel: "We suggest you try the 4 stars version.",
         tryMediumLevel: "We suggest you try the 3 stars version.",
         tryNextTask: "We suggest you try the next task. If you still have time, come back later and try the next version of this task.",
         yourScoreIsNow: "Your score is now:",
         worseScoreStays: "This is not as good as before. Your score stays:",
         scoreStays: "Your score stays the same:",
         score: "Score:",
         noPointsForLevel: "You have not received any points yet on this version.",
         outOf: " out of ",
         tryToDoBetterOrChangeTask: "Try to do even better, or move on to another task.",
         tryToDoBetterOrMoveToNextLevel: "Try to do even better, or move on to a more difficult version.",
         bestPossibleScoreCongrats: "This is the best possible score on this task, congratulations!",
         forMorePointsMoveToNextLevel: "To obtain more points, move on to a harder version of this task.",
         youDidBetterBefore: "You did better before.",
         scoreStays2: "Your score stays the same.",
         reloadBestAnswer: "Reload your best answer.",
         validate: "Validate",
         restart: "Restart",
         harderLevelSolved: "Warning: you already solved a harder version of this task. You won't be able to obtain extra points with this version.",
         showLevelAnyway: "Show it to me anyways.",
         scoreObtained: "Obtained score:",
         hardVersionTakesTime: "Solving a {0} can take a lot of time. Consider working on the {1} to gain points quickly.",
         illKeepThatInMind: "I'll consider it.",
         harderLevelAvailable: "Note that for this task, you may try to directly work on a harder version than this one.",
         lockedLevel: "This version is locked. Solve the previous version to display it!",
         gradeThisAnswer: "Grade this answer",

         // The following messages are used for tasks with no feedback
         saveAnswer: "Save this answer",
         answerSavedModifyOrCancelIt: "Your answer has been saved. You can modify it, or {0} and restart.",
         cancelIt: "cancel it",
         warningDifferentAnswerSaved: "Warning: a different answer was saved before.",
         youMay: "You may {0}.",
         reloadIt: "reload it",
         saveThisNewAnswer: "Save this new answer",

         gradingInProgress: "Grading in process",
         scoreIs: "Your score is:",
         point: "point",
         points: "points",
         // The following messages are used when viewing tasks after contest is over
         contestOverScoreStays: "The contest being over, your new answer was not saved and your score stays:",
         scoreWouldBecome: "With this answer, your score would be:",
         reloadValidAnswer: "Reload the validated answer.",
         contestOverAnswerNotSaved: "The contest being over, your new answer was not saved.",
         scoreWouldStay: "With this answer, your score would stay the same:",
         answerNotSavedContestOver: "The contest being over, your answer was not saved. You may {0}.",
         reloadSubmittedAnswer: "reload the validated answer",
         difficultyWarning: "<strong>Warning:</strong> solving this version takes time.<br/>You would solve the 2 or 3 star versions of other tasks more quickly."
      },
      de: {
         version: "Serie",
         levelVersionName_easy: "einfache Serie",
         levelVersionName_medium: "mittlere Serie",
         levelVersionName_hard: "schwere Serie",
         levelVersionName_easy_stars: "Serie mit 2 Sternen",
         levelVersionName_medium_stars: "Serie mit 3 Sternen",
         levelVersionName_hard_stars: "Serie mit 4 Sternen",
         levelName_easy: "Einfach",
         levelName_medium: "Mittel",
         levelName_hard: "Schwer",
         warningTimeout: "<p>Achtung, es sind bereits {0} Minuten vergangen, die du an dieser Frage sitzt.</p><p>Du solltest das Thema wechseln, indem du den Knopf oben rechts drückst.</p>",
         alright: "Einverstanden",
         moveOn: "Weiter",
         solvedMoveOn: "Du hast die Frage vollständig gelöst, zu nächsten Frage.",
         confirmRestart: "Bist du sicher diese Serie neu zu beginnen?",
         yes: "Ja",
         no: "Nein",
         tryHardLevel: "Wir schlagen die 4 Sterne-Serie vor.",
         tryMediumLevel: "Wir schlagen die 3 Sterne-Serie vor.",
         tryNextTask: "Wir schlagen das nächste Thema vor. Wenn noch Zeit bleibt, kannst du später zurückkehren.",
         yourScoreIsNow: "Dein Punktestand ist:",
         worseScoreStays: "Es ist schlechter als zuvor; dein Punktestand bleibt:",
         scoreStays: "Dein Punktestand bleibt gleich:",
         score: "Punktestand:",
         noPointsForLevel: "Du hast in dieser Serie noch keine Punkte erreicht.",
         outOf: " von ",
         tryToDoBetterOrChangeTask: "Versuch es besser zu machen oder gehe zur nächsten Frage.",
         tryToDoBetterOrMoveToNextLevel: "Versuch es besser zu machen oder gehe zu einer schwereren Serie.",
         bestPossibleScoreCongrats: "Dies ist der bestmögliche Punktestand für dieses Thema; Gratulation!",
         forMorePointsMoveToNextLevel: "Um mehr Punkte zu erhalten, gehe zu einer schwereren Serie.",
         youDidBetterBefore: "Das hast du vorher besser gemacht.",
         scoreStays2: "Dein Punktestand bleibt gleich.",
         reloadBestAnswer: "Lade deine beste Antwort neu.",
         validate: "bestätigen",
         restart: "ne beginnen",
         harderLevelSolved: "Achtung: du hast schon eine schwerere Serie gelöst. Du kannst in dieser Serie keine zusätzlichen Punkte mehr erhalten.",
         showLevelAnyway: "Trotzdem sehen",
         scoreObtained: "Erhaltener Punktestand:",
         hardVersionTakesTime: "Löse eine {0} kann dich viel Zeit kosten; denk daran eher die Fragen in {1} zu beantworten um schnelle Punkte zu gewinnen.",
         illKeepThatInMind: "Ich gebe Acht",
         harderLevelAvailable: "Beachte, für diese Frage kannst du direkt in eine schwerere Serie wechseln.",
         lockedLevel: "Diese Serie ist gesperrt. Löse die vorherige um dies angezeigt zu bekommen!",
         gradeThisAnswer: "Bewerte diese Antwort",

         // The following messages are used for tasks with no feedback
         saveAnswer: "Speicher deine Antwort",
         answerSavedModifyOrCancelIt: "Deine Antwort wurde gespeichert. Du kannst sie ändern oder {0} und neu beginnen.",
         cancelIt: "annullieren",
         warningDifferentAnswerSaved: "Achtung: eine andere Antwort wurde gespeichert.",
         youMay: "Du darfst {0}.",
         reloadIt: "neuladen",
         saveThisNewAnswer: "Speichere diese neue Antwort",

         gradingInProgress: "Bewertung im Gange",
         scoreIs: "Deine Bewertung ist:",
         point: "Punkt",
         points: "Punkte",
         // The following messages are used when viewing tasks after contest is over
         contestOverScoreStays: "Der Wettbewerb ist beendet, deine Antwort wurde nicht gespeichert und dein Punktestand bleibt:",
         scoreWouldBecome: "Mit dieser Antwort, dein Punktestand wäre:",
         reloadValidAnswer: "Lade die gültige Antwort neu.",
         contestOverAnswerNotSaved: "Der Wettbewerb wurde beendet: deine Antwort wurde nicht gespeichert.",
         scoreWouldStay: "Mit dieser Antwort, dein Punktestand bliebe gleich:",
         answerNotSavedContestOver: "Der Wettbewerb ist beendet, deine Antwort wurde nicht gespeichert. Du kannst {0}.",
         reloadSubmittedAnswer: "lade deine übertragene Antwort neu",
         difficultyWarning: "<strong>Achtung</strong>: diese Serie zu lösen kann viel Zeit benötigen.<br/>Du kannst schneller ein Thema einer 2 oder 3 Sternserie lösen."
      },
      nl: {
         version: "Versie",
         levelVersionName_easy: "gemakkelijke versie",
            levelVersionName_medium: "gemiddelde versie",
         levelVersionName_hard: "moeilijke versie",
         levelVersionName_easy_stars: "versie met 2 sterren",
            levelVersionName_medium_stars: "versie met 3 sterren",
         levelVersionName_hard_stars: "versie met 4 sterren",
         levelName_easy: "Gemakkelijk",
         levelName_medium: "Gemiddeld",
         levelName_hard: "Moeilijk",
         warningTimeout: "<p>Let op, je bent al meer dan {0} minuten bezig met deze vraag.</p><p>Misschien moet je van onderwerp veranderen, door te klikken op de knop rechtsboven.</p>",
         alright: "Akkoord",
         moveOn: "Ga naar de volgende",
         solvedMoveOn: "Je hebt deze vraag helemaal opgelost, ga verder met een andere vraag.",
         confirmRestart: "Ben je zeker dat je deze versie wilt herbeginnen?",
         yes: "Ja",
         no: "Nee",
         tryHardLevel: "We stellen voor dat je de versie met 4 sterren probeert.",
         tryMediumLevel: "We stellen voor dat je de versie met 3 sterren probeert.",
         tryNextTask: "We stellen voor dat je met de volgende vraag begint. Als je tijd over hebt, kan je later terugkomen voor de volgende versie.",
         yourScoreIsNow: "Jouw score is nu:",
         worseScoreStays: "Dit is minder dan voordien; jouw score blijft:",
         scoreStays: "Jouw score blijft hetzelfde:",
         score: "Score:",
         noPointsForLevel: "Je hebt nog geen punten behaald op deze vraag.",
         outOf: " op ",
         tryToDoBetterOrChangeTask: "Probeer om nog beter te doen, of ga verder met een andere vraag.",
         tryToDoBetterOrMoveToNextLevel: "Probeer om nog beter te doen, of ga verder naar een moeilijkere versie.",
         bestPossibleScoreCongrats: "Dit is de best mogelijke score op deze vraag; proficiat!",
         forMorePointsMoveToNextLevel: "Ga verder naar een moeilijkere versie om meer punten te behalen.",
         youDidBetterBefore: "Je hebt eerder al beter gedaan.",
         scoreStays2: "Je score blijft hetzelfde.",
         reloadBestAnswer: "Herlaad je beste antwoord.",
         validate: "Valideren",
         restart: "Herbeginnen",
         harderLevelSolved: "Let op: je hebt al een moeilijkere versie opgelost. Je kan met deze versie geen extra punten halen.",
         showLevelAnyway: "Toon het mij toch",
         scoreObtained: "Behaalde score:",
         hardVersionTakesTime: "Het oplossen van {0} kan je veel tijd kosten; overweeg om eerst de vragen in {1} op te lossen om snel punten te halen.",
         illKeepThatInMind: "Ik zal er aan denken",
         harderLevelAvailable: "Merk op dat je voor deze vraag nu al een moeilijkere versie dan deze mag oplossen.",
         lockedLevel: "Deze versie is nog geblokkeerd. Los de vorige versie op om ze te ontsluiten!",
         gradeThisAnswer: "Evalueer dit antwoord",

         // The following messages are used for tasks with no feedback
         saveAnswer: "Bewaar jouw antwoord",
         answerSavedModifyOrCancelIt: "Jouw antwoord is bewaard. Je kan het aanpassen, of {0} en herbeginnen.",
         cancelIt: "het annuleren",
         warningDifferentAnswerSaved: "Let op: er is een verschillend antwoord bewaard.",
         youMay: "Je kan {0}.",
         reloadIt: "het herladen",
         saveThisNewAnswer: "Bewaar dit nieuwe antwoord",

            gradingInProgress: "Bezig met evalueren",
            scoreIs: "Jouw score is:",
         point: "punt",
         points: "punten",
         // The following messages are used when viewing tasks after contest is over
         contestOverScoreStays: "De wedstrijd is reeds afgelopen, jouw antwoord is dus niet bewaard en jouw score blijft:",
         scoreWouldBecome: "Met dit antwoord zou dit jouw score zijn:",
         reloadValidAnswer: "Herlaad het gevalideerde antwoord.",
         contestOverAnswerNotSaved: "De wedstrijd is afgelopen: jouw antwoord is niet bewaard.",
            scoreWouldStay: "Met dit antwoord, zou jouw score hetzelfde zijn gebleven:",
            answerNotSavedContestOver: "De wedstrijd is reeds afgelopen, je antwoord werd niet bewaard. Je kan {0}.",
            reloadSubmittedAnswer: "het antwoord herlanden dat je hebt ingediend",
         difficultyWarning: "<strong>Let op</strong>: deze versie oplossen vraagt tijd.<br/>Je kan waarschijnlijk sneller de versies met 2 of 3 sterren van andere vragen oplossen."
      },
      ar: {
         version: "المستوى",
         levelVersionName_easy: "المستوى السهل",
         levelVersionName_medium: "المستوى المتوسط",
         levelVersionName_hard: "المستوى الصعب",
         levelVersionName_easy_stars: "المستوى الأول",
         levelVersionName_medium_stars: "المستوى الثاني",
         levelVersionName_hard_stars: "المستوى الثالث",
         levelName_easy: "سهل",
         levelName_medium: "متوسط",
         levelName_hard: "صعب",
         warningTimeout: "<p>لقد مر وقت طويل منذ أن بدأت في هذه المسألة, من الأفضل أن تبدأ في مسألة أخرى حتى لا يضيع الوقت</p>",
         alright: "حسناً",
         moveOn: "استمر",
         solvedMoveOn: "لقد أجبت على هذا السؤال بالكامل. ابدأ في سؤال أخر",
         confirmRestart: "هل ترغب في بدء هذا سؤال من جديد؟",
         yes: "نعم",
         no: "لا",
         tryHardLevel: "نقترح أن تبدأ في المستوى الثالث للسؤال",
         tryMediumLevel: "نقترح أن تبدأ في المستوى الثاني للسؤال",
         tryNextTask: "نقترح أن تبدأ في المسألة التالية, وإذا تبقى عندك وقت يمكنك حل المستوى الأصعب في هذه المسألة لاحقاً",
         yourScoreIsNow: "مجموع نقاطك:",
         worseScoreStays: "هذا ليس جيداً. ما زالت نقاطك:",
         scoreStays: "نقاطك ما زالت كما هي:",
         score: "النقاط",
         noPointsForLevel: "لم تحقق أي نقاط في هذا المستوى",
         outOf: "من",
         tryToDoBetterOrChangeTask: "حاول في مسألة أخرى",
         tryToDoBetterOrMoveToNextLevel: "حاول في المستوى الأصعب",
         bestPossibleScoreCongrats: "مبروك ... لقد حصلت على أعلى درجة في هذا السؤال",
         forMorePointsMoveToNextLevel: "للحصول على المزيد من النقاط جاوب على المستوى الأصعب",
         youDidBetterBefore: "لقد قمت بها أفضل من هذا في وقت سابق",
         scoreStays2: "ما زالت نقاطك كما هي",
         reloadBestAnswer: "اعد تحميل إجابتك الأفضل",
         validate: "تحقق",
         restart: "ابدأ من جديد",
         harderLevelSolved: "لقد قمت بحل المستوى الأصعب في هذا السؤال, لن تتمكن من الحصول على درجات أعلى في هذا السؤال",
         showLevelAnyway: "اظهرها لي على أي حال",
         scoreObtained: "النقاط المكتسبة:",
         hardVersionTakesTime: "Solving a {0} can take a lot of time. Consider working on the {1} to gain points quickly.",
         illKeepThatInMind: "I'll consider it.",
         harderLevelAvailable: "تنبيه: يمكنك حل المستوى الأصعب في هذه المسألة مباشرة",
         lockedLevel: "هذا المستوى مغلق. يجب عليك حل المستوى السابق أولا",
         gradeThisAnswer: "قيم هذه الإجابة",

         // The following messages are used for tasks with no feedback
         saveAnswer: "احفظ هذه الإجابة",
         answerSavedModifyOrCancelIt: "تم حفظ إجابتك, يمكنك تعديلها أو بدأها من جديد",
         cancelIt: "احذفها",
         warningDifferentAnswerSaved: "تنبيه: يوجد اجابة أخرى محفوظة سابقاً",
         youMay: "You may {0}.",
         reloadIt: "حملها من جديد",
         saveThisNewAnswer: "احفظ الإجابة الجديدة",

         gradingInProgress: "نقوم بالتقييم",
         scoreIs: "مجموع نقاطك:",
         point: "نقطة",
         points: "نقاط",
         // The following messages are used when viewing tasks after contest is over
         contestOverScoreStays: "المسابقة انتهت. إجابتك الجديدة لم تحفظ ومجموع نقاطك ما زال:",
         scoreWouldBecome: " مع تلك الإجابة، مجموع نقاطك أصبح:",
         reloadValidAnswer: "اعد تحميل الإجابة المحققة",
         contestOverAnswerNotSaved: "المسابقة إنتهت ولم يتم حفظ إجاباتك الجديدة",
         scoreWouldStay: "بهذه الإجابة سوف يظل مجموع نقاطك كما هو",
         answerNotSavedContestOver: "The contest being over, your answer was not saved. You may {0}.",
         reloadSubmittedAnswer: "اعد تحميل الإجابة المحققة",
         difficultyWarning: "تنبيه: حل هذه النسخة سوف يستغرق وقت كثير. الإفضل أن تبدأ في حل مسائل أخرى"
      }
   },
   initLanguage: function() {
      if (window.stringsLanguage == undefined) {
         window.stringsLanguage = 'fr';
      }
      this.strings = this.languageStrings[window.stringsLanguage];
   },
   /***********************************************
    * Initialization functions called by the task *
    ***********************************************/
   load: function(views) {
      this.initLanguage();
      var self = this;
      this.showScore = (typeof views.grader !== 'undefined' && views.grader === true);
      window.platform.getTaskParams(null, null, function(taskParams) {
         self.taskParams = taskParams;
         self.readOnly = (self.taskParams.readonly === true || self.taskParams.readOnly == 'true');
         self.graderScore = +self.taskParams.noScore;
         self.savedAnswer = '';

         $("#difficultyWarning").html(self.strings.difficultyWarning).addClass("warningHeader");
         var addTaskHTML = '<div id="displayHelperAnswering" class="contentCentered">';
         // Place button placements at the end of HTML if they don't already exist
         var placementNames = ['graderMessage', 'validate', 'cancel', 'saved'];
         for (var iPlacement = 0; iPlacement < placementNames.length; iPlacement++) {
            var placement = 'displayHelper_' + placementNames[iPlacement];
            if ($('#' + placement).length === 0) {
               addTaskHTML += '<div id="' + placement + '"></div>';
            }
         }
         addTaskHTML += '</div>';
         if (!document.getElementById('displayHelperAnswering')) {
            $(self.taskSelector).append(addTaskHTML);   
         }
         self.loaded = true;
         self.timeLoaded = new Date().getTime();
         if (self.popupMessageShown) {
            $('#displayHelperAnswering').hide();
         }

         var taskDelayWarning = function() {
            if (self.popupMessageShown) {
               self.taskDelayWarningTimeout = setTimeout(taskDelayWarning, 5000);
            } else {
               self.showPopupMessage(self.formatTranslation(self.strings.warningTimeout, [self.timeoutMinutes]), 'blanket', self.strings.alright, null, null, "warning");
               self.taskDelayWarningTimeout = null;
            }
         };
         if (self.timeoutMinutes > 0) {
            self.taskDelayWarningTimeout = setTimeout(taskDelayWarning, self.timeoutMinutes * 60 * 1000);
         }
      });
   },
   unload: function() {
      if (this.taskDelayWarningTimeout) {
         this.taskDelayWarningTimeout = clearTimeout(this.taskDelayWarningTimeout);
      }
      clearInterval(this.checkAnswerInterval);
      this.checkAnswerInterval = null;
      this.loaded = false;
      this.prevAnswer = '';
      this.readOnly = false;
      this.savedAnswer = '';
      this.submittedAnswer = '';
      this.submittedScore = 0;
      this.hasAnswerChanged = true;
      this.hideValidateButton = false;
      this.hideRestartButton = false;
      this.showScore = false;
      this.refreshMessages = true;
      this.stoppedShowingResult = false;
      this.previousMessages = {};
      this.popupMessageShown = false;
      this.hasLevels = false;
      this.pointsAsStars = true; // TODO: false as default
      this.unlockedLevels = 3;
      this.neverHadHard = false;
      this.showMultiversionNotice = false;
      this.levelsScores = { easy: 0, medium: 0, hard: 0 };
      this.prevLevelsScores = { easy: 0, medium: 0, hard: 0 };
      this.taskLevel = '';
      return true;
   },

   setupLevels: function(initLevel, reloadWithCallbacks) {
      this.reloadWithCallbacks = reloadWithCallbacks;
      this.initLanguage();
      if (!initLevel) {
         if (!this.taskParams) {
            var self = this;
            window.platform.getTaskParams(null, null, function(taskParams) {
               self.taskParams = taskParams;
               initLevel = taskParams.options.difficulty ? taskParams.options.difficulty : "easy";
               self.doSetupLevels(initLevel);
            });
         } else {
            initLevel = this.taskParams.options.difficulty ? this.taskParams.options.difficulty : "easy";
            this.doSetupLevels(initLevel);
         }
      } else {
         this.doSetupLevels(initLevel);
      }
   },
   doSetupLevels: function(initLevel) {
      // TODO To fix: levelWrapper-1 does not work correctly without this part,
      // so the level is loaded twice initially (once here, and once below).
      if(!this.reloadWithCallbacks) {
         task.reloadStateObject(task.getDefaultStateObject(), true);
         task.reloadAnswerObject(task.getDefaultAnswerObject());
      }
      
      this.setupParams();
      if (!document.getElementById('popupMessage')) {
         this.setupLevelsTabs();
         $('#tabsMenu .li').on('click', function(event) {
            event.preventDefault();
            var newLevel = $(this).children().attr('href').split('#')[1];
            displayHelper.setLevel(newLevel);
         });
      }

      this.setLevel(initLevel);

      if (this.unlockedLevels > 1 && this.showMultiversionNotice) {
         this.showPopupMessage(this.strings.harderLevelAvailable, 'blanket', this.strings.alright,
            function() {
               this.showMultiversionNotice = false;
            }
         );
      }
   },
   setupParams: function() {
      var taskParams = this.taskParams;

      this.hasLevels = true;
      var paramNames = ['pointsAsStars', 'unlockedLevels', 'neverHadHard', 'showMultiversionNotice'];
      for (var iParam = 0; iParam < paramNames.length; iParam++) {
         var param = paramNames[iParam];
         if (taskParams[param] !== undefined) {
            this[param] = taskParams[param];
         }
      }

      var maxScore = taskParams.maxScore !== undefined ? taskParams.maxScore : 40;
      this.levelsMaxScores = {
         easy: (this.pointsAsStars ? maxScore / 2 : Math.round(maxScore / 2)),
         medium: (this.pointsAsStars ? maxScore * 3 / 4 : Math.round(maxScore * 3 / 4)),
         hard: maxScore
      };
   },
   setupLevelsTabs: function() {
      var scoreHTML;
      var maxScores = this.levelsMaxScores;
      if (this.pointsAsStars) {
         var titleStarContainers = [];
         scoreHTML = '<span></span><span id="titleStars"></span>';
         $('#task > h1').append(scoreHTML);
         drawStars('titleStars', 4, 24, 0, 'normal');
      } else {
         // Disabled: doesn't work with new tabs layout.
         //scoreHTML = '<div class="bestScore">Score retenu : <span id="bestScore">0</span> sur ' + maxScores.hard + '</div>';
         //$('#tabsContainer').append(scoreHTML);
      }

      var tabsStarContainers = [];
      var tabsHTML = '<div id="tabsMenu">';
      var curLevel;
      for (curLevel in this.levelsRanks) {
         tabsHTML += '<span class="li" id="tab_' + curLevel + '"><a href="#' + curLevel + '">';
         if (this.pointsAsStars) {
            tabsHTML += this.strings.version + ' <span id="stars_' + this.levelsRanks[curLevel] + '"></span>';
         } else {
            tabsHTML += this.strings["levelName_" + curLevel] + ' — ' +
               '<span id="tabScore_' + curLevel + '">0</span> / ' + maxScores[curLevel];
         }
         tabsHTML += '</a></span>';
      }
      tabsHTML += '</div>';
      $('#tabsContainer').append(tabsHTML);

      var self = this;
      setTimeout(function() {
         for (var iLevel = 0; iLevel < self.levels.length; iLevel++) {
            curLevel = self.levels[iLevel];
            if (iLevel >= self.unlockedLevels) {
               $('#tab_' + curLevel).addClass('lockedLevel');
            }
            self.updateStarsAtLevel(curLevel);
         }
      }, 100);

      $('#tabsContainer').after('<div id="popupMessage"></div>');
   },

   updateStarsAtLevel: function(level) {
      var rate = this.levelsScores[level] / this.levelsMaxScores[level];
      var iLevel = this.levelsRanks[level];
      var mode = 'normal';
      if (iLevel >= this.unlockedLevels) {
         mode = 'locked';
      }
      if (this.graderScore > this.levelsMaxScores[level]) {
         mode = 'useless';
      }
      drawStars('stars_' + iLevel, iLevel + 2, 18, rate, mode);
   },

   // Deprecated: use directly levelsMaxScores instead
   getLevelsMaxScores: function() {
      return this.levelsMaxScores;
   },

   setLevel: function(newLevel) {
      if (this.taskLevel == newLevel) {
         return;
      } else if (this.popupMessageShown) {
         $('#popupMessage').hide();
         $('#displayHelperAnswering, #taskContent').show();
         this.popupMessageShown = false;
      }

      for (var curLevel in this.levelsRanks) {
         $('#tab_' + curLevel).removeClass('current');
         $('.' + curLevel).hide();
      }
      $('#tab_' + newLevel).addClass('current');
      $('.' + newLevel).show();

      var answer = task.getAnswerObject();
      var state = task.getStateObject();
      state.level = newLevel;
      this.taskLevel = newLevel;
      var self = this;
      
      var afterReload = function() {
         self.submittedScore = self.levelsScores[self.taskLevel];
         self.refreshMessages = true;
         self.checkAnswerChanged();
         self.stopShowingResult();
   
         if ($('#tab_' + newLevel).hasClass('lockedLevel')) {
            self.showPopupMessage(self.strings.lockedLevel, 'lock');
         } else if (!self.hasSolution) {
            if ($('#tab_' + newLevel).hasClass('uselessLevel') && self.levelsScores[newLevel] < self.levelsMaxScores[newLevel]) {
               self.showPopupMessage(self.strings.harderLevelSolved, 'tab', self.strings.showLevelAnyway, null, null, "warning");
            } else if (newLevel == 'hard' && self.neverHadHard) {
               var hardVersionKey = "levelVersionName_hard";
               var easyVersionKey = "levelVersionName_easy"; 
               if (self.pointsAsStars) {
                  hardVersionKey += "_stars";
                  easyVersionKey += "_stars";
               }
               self.showPopupMessage(self.formatTranslation(self.strings.hardVersionTakesTime, [self.strings[hardVersionKey], self.strings[easyVersionKey]]),
               'tab',
                  self.strings.illKeepThatInMind, function() {
                     self.neverHadHard = false;
                  }
               );
            }
         }
      };
      
      if(self.reloadWithCallbacks) {
         task.reloadStateObject(state, function() {
            task.reloadAnswerObject(answer, afterReload);
         });
      }
      else {
         task.reloadStateObject(state, true);
         task.reloadAnswerObject(answer);
         afterReload();
      }
   },
   getAvatar: function(mood) {
      return "beoi.png";
   },
   showPopupMessage: function(message, mode, yesButtonText, agreeFunc, noButtonText, avatarMood) {
      if (mode != 'blanket') {
         $('#taskContent, #displayHelperAnswering').hide();
         $('#popupMessage').removeClass('floatingMessage');
      } else {
         $('#popupMessage').addClass('floatingMessage');
      }

      if (!yesButtonText) {
         yesButtonText = this.strings.alright;
      }
      // Hack: when in the context of the platform, we need to change the path
      var imgPath = window.contestsRoot ? window.contestsRoot + '/' + window.contestFolder + '/' : '../../modules/img/';
      var buttonYes = mode == 'lock' ? '' : '<button class="buttonYes">' + (yesButtonText || this.strings.alright) + '</button>';
      var buttonNo = '';
      if (noButtonText != undefined) {
         buttonNo = '<button class="buttonNo" style="margin-left: 10px;">' + noButtonText + '</button>';
      }
      $('#popupMessage').html('<div class="container">' +
         '<img class="beaver" src="' + imgPath + this.getAvatar(avatarMood) + '"/>' +
         '<img class="messageArrow" src="' + imgPath + 'fleche-bulle.png"/>' +
         '<div class="message">' + message + '</div>' + buttonYes + buttonNo + '</div>').show();
      $('#popupMessage .buttonYes').click(function() {
         $('#popupMessage').hide();
         $('#displayHelperAnswering, #taskContent').show();
         displayHelper.popupMessageShown = false;
         if (agreeFunc) {
            agreeFunc();
         }
      });
      $('#popupMessage .buttonNo').click(function() {
         $('#popupMessage').hide();
         $('#displayHelperAnswering, #taskContent').show();
         displayHelper.popupMessageShown = false;
      });
      this.popupMessageShown = true;
      try {
         $(parent.document).scrollTop(0);
      } catch (e) {
      }
   },

   // Function to call at the beginning of task loading, before any html has
   // been modified. It places the markers where the buttons will appear, if the
   // markers are not present already.
   showViews: function(views) {
      // Fix for an old version of Firefox in which selection was stuck
      try {
         if (document.getSelection) {
            var selection = document.getSelection();
            if (selection !== undefined && selection.removeAllRanges !== undefined) {
               selection.removeAllRanges();
            }
         }
      } catch (err) {}

      this.views = views;
      this.hasSolution = (typeof views.solution !== 'undefined');
      if (this.hasSolution && this.graderScore) {
         this.prevSavedScore = this.graderScore;
      }
      var self = this;
      this.checkAnswerInterval = setInterval(
         function() {
            self.checkAnswerChanged();
         }, 1000);
      task.getAnswer(function(answer) {
         self.defaultAnswer = answer;
         self.refreshMessages = true;
         self.checkAnswerChanged();
      });
   },

   reloadAnswer: function(strAnswer) {
      this.savedAnswer = strAnswer;
      this.prevAnswer = strAnswer;
      this.submittedAnswer = strAnswer;
      var that = this;
      if (this.showScore) {
         // TODO we only know the answer here, and not the state. Possibly problematic?
         this.updateScore(strAnswer, true, function() {
            that.checkAnswerChanged(); // necessary?
         });
      } else {
         that.checkAnswerChanged(); // necessary?
      }
   },

   reloadState: function() {
      this.checkAnswerChanged(); // necessary?
   },

   stopShowingResult: function() {
      this.stoppedShowingResult = true;
      this.updateMessages();
   },

   /**********************
    * Internal functions *
    **********************/
   restartAll: function() {
      var that = this;
      function confirmRestartAll() {
         that.stopShowingResult();
         if (!that.hasLevels) {
            // TODO is this the desired behavior for no levels?
            task.reloadAnswer('', function() {});
         } else {
            task.getAnswer(function(strAnswer) {
               var answer = $.parseJSON(strAnswer);
               var defaultAnswer = task.getDefaultAnswerObject();
               var level = displayHelper.taskLevel;
               answer[level] = defaultAnswer[level];
               task.reloadAnswer(JSON.stringify(answer), function() {});
            });
         }
      }
      if (this.hasLevels) {
         this.showPopupMessage(this.strings.confirmRestart, 'blanket', this.strings.yes, confirmRestartAll, this.strings.no);
      } else {
         confirmRestartAll();
      }
   },

   validate: function(mode) {
      this.stoppedShowingResult = false;
      var self = this;
      if (mode == 'cancel') {
         this.savedAnswer = '';
         task.reloadAnswer('', function() {
            self.checkAnswerChanged();
         });
      } else {
         task.getAnswer(function(strAnswer) {
            if (!self.hasSolution) {
               self.prevSavedScore = self.graderScore;
               if (self.hasLevels) {
                  self.prevLevelsScores[self.taskLevel] = self.levelsScores[self.taskLevel];
               }
            }
            var refresh = function() {
               self.refreshMessages = true;
               self.checkAnswerChanged();
            };
            self.submittedAnswer = strAnswer;
            if (self.showScore) {
               self.updateScore(strAnswer, false, refresh);
            } else {
               self.savedAnswer = strAnswer;
               refresh();
            }
         });
      }
   },

   updateScore: function(strAnswer, allLevels, callback) {
      var self = this;
      function refresh() {
         self.refreshMessages = true;
         self.checkAnswerChanged();
         callback();
      }
      if (allLevels) {
         // TODO: make sure the grader doesn't evaluate each level at each call (most do right now!)
         self.updateScoreOneLevel(strAnswer, "easy", function() {
            self.updateScoreOneLevel(strAnswer, "medium", function() {
               self.updateScoreOneLevel(strAnswer, "hard", refresh);
            });
         });
      } else {
         this.updateScoreOneLevel(strAnswer, this.taskLevel, function() {
            if (self.hasLevels) {
               self.showValidatePopup(self.taskLevel);
            }
            callback();
         });
      }
   },
   updateScoreOneLevel: function(strAnswer, gradedLevel, callback) {
      var self = this;
      this.graderMessage = this.strings.gradingInProgress;
      task.getLevelGrade(strAnswer, null, function(score, message) {
         score = +score;
         self.submittedScore = score;
         if (self.hasSolution) {
            self.graderScore = score;
            self.levelsScores[gradedLevel] = score;
         } else {
            if (self.hasLevels) {
               if (score > self.levelsScores[gradedLevel]) {
                  self.levelsScores[gradedLevel] = score;
                  self.graderScore = score;
                  if (self.savedAnswer === '') {
                     self.savedAnswer = strAnswer;
                  } else {
                     var savedAnswerObj = $.parseJSON(self.savedAnswer);
                     var answerObj = $.parseJSON(strAnswer);
                     savedAnswerObj[gradedLevel] = answerObj[gradedLevel];
                     self.savedAnswer = JSON.stringify(savedAnswerObj);
                  }
               }
            } else if (score > self.graderScore) {
               self.savedAnswer = strAnswer;
               self.graderScore = score;
            }
         }
         if (message !== undefined) {
            self.graderMessage = message;
         } else {
            self.graderMessage = "";
         }
         // TODO : should not be called from here, might update the display of a level not currently opened!
         if (self.hasLevels) {
            self.updateScoreDisplays(gradedLevel);
         }
         callback();
      }, gradedLevel);
   },
   updateScoreDisplays: function(gradedLevel) {
      var scores = this.levelsScores;
      var maxScores = this.levelsMaxScores;
      if (this.pointsAsStars) {
         this.updateStarsAtLevel(gradedLevel);
         drawStars('titleStars', 4, 24, this.graderScore / maxScores.hard, 'normal');
      } else {
         $('#tabScore_' + gradedLevel).html(scores[gradedLevel]);
         $('#bestScore').html(this.graderScore);
      }

      var gradedLevelNum = $.inArray(gradedLevel, this.levels);
      var curLevel;
      // Possibly unlocking a level
      if (maxScores[gradedLevel] == scores[gradedLevel]) {
         var unlockedLevel = gradedLevelNum + 1;
         if (unlockedLevel < this.levels.length && unlockedLevel >= this.unlockedLevels) {
            curLevel = this.levels[unlockedLevel];
            $('#tab_' + curLevel).removeClass('lockedLevel');
            this.unlockedLevels++;
            this.updateStarsAtLevel(curLevel);
         }
      }
      if (scores[gradedLevel] == this.graderScore) {
         // Marks levels that can't earn points as useless
         for (curLevel in this.levelsRanks) {
            if (maxScores[curLevel] > this.graderScore) {
               break;
            }
            if (this.pointsAsStars) {
               this.updateStarsAtLevel(curLevel);
            }
            $('#tab_' + curLevel).addClass('uselessLevel');
         }
      }
   },
   showValidatePopup: function(gradedLevel) {
      var curTime = new Date().getTime();
      var secondsSinceLoaded = (curTime - this.timeLoaded) / 1000;
      var actionNext = "stay";
      // Display popup to indicate what to do next
      var fullMessage = this.graderMessage;
      var maxScores = this.levelsMaxScores;
      var buttonText = this.strings.alright;
      var avatarMood = "error";
      if (this.graderScore >= maxScores[gradedLevel] - 0.001) {
         avatarMood = "success";
         buttonText = this.strings.moveOn;
         fullMessage += "<br/><br/>";
         if (gradedLevel == "hard") {
            actionNext = "nextTask";
            fullMessage += this.strings.solvedMoveOn;
         } else {
            if ((gradedLevel == "medium") && (secondsSinceLoaded < this.thresholdMedium)) {
               actionNext = "hard";
               fullMessage += this.strings.tryHardLevel;
            } else if ((gradedLevel == "easy") && (secondsSinceLoaded < this.thresholdEasy)) {
               actionNext = "medium";
               fullMessage += this.strings.tryMediumLevel;
            } else {
               actionNext = "nextTask";
               fullMessage += this.strings.tryNextTask;
            }
         }
      }
      var self = this;
      this.showPopupMessage(fullMessage, 'blanket', buttonText,
         function() {
            // TODO: replace with something compatible with the API.
            try {
               $(parent.document).scrollTop(0);
            } catch (e) {
            }
            if ((actionNext == "medium") || (actionNext == "hard")) {
               self.setLevel(actionNext);
            } else if (actionNext == "nextTask") {
               platform.validate("nextImmediate");
            }
         },
         null,
         avatarMood
      );
   },

   // Does task have unsaved answers?
   hasNonSavedAnswer: function(callback) {
      if (!task) {
         return false;
      }
      var self = this;
      task.getAnswer(function(curAnswer) {
         if (curAnswer != self.prevAnswer) {
            try {
               if (self != top && parent.Tracker) {
                  var data = {
                     dataType: 'nonSavedAnswer', teamID: parent.teamID, questionKey: parent.currentQuestionKey, answer: curAnswer
                  };
                  // Call TrackData, only when loaded in an iframe
                  // this is not yet document in the API, but should be soonish
                  parent.Tracker.trackData(data);
               }
            } catch (e) {}
            self.prevAnswer = curAnswer;
         }
         if (curAnswer != self.submittedAnswer) {
            self.submittedAnswer = '';
            self.refreshMessages = true;
         }
         if (curAnswer == self.defaultAnswer && self.savedAnswer === '') {
            callback(false);
         } else {
            callback(curAnswer != self.submittedAnswer);
         }
      });
   },

   // Checks task.getAnswer() against previously recorded result, and calls
   // displayHelper.updateMessages() accordingly.
   checkAnswerChanged: function() {
      if (!this.loaded) {
         this.checkAnswerInterval = clearInterval(this.checkAnswerInterval);
         return;
      }
      var self = this;
      this.hasNonSavedAnswer(function(hasNonSavedAnswer) {
         if (hasNonSavedAnswer && !self.hasAnswerChanged) {
            self.refreshMessages = true;
            self.hasAnswerChanged = true;
         } else if (!hasNonSavedAnswer && self.hasAnswerChanged) {
            self.refreshMessages = true;
            self.hasAnswerChanged = false;
         }
         if (self.refreshMessages) {
            self.updateMessages();
         }
      });
   },

   getFullFeedbackSavedMessage: function(taskMode) {
      var scoreDiffMsg = this.strings.score;
      var showRetrieveAnswer = false;
      if (this.submittedAnswer !== '' && this.prevSavedScore !== undefined) {
         if (!this.hasSolution) {
            if (this.prevSavedScore < this.submittedScore) {
               scoreDiffMsg = this.strings.yourScoreIsNow;
            } else if (this.prevSavedScore > this.submittedScore) { 
               scoreDiffMsg = this.strings.worseScoreStays;
               showRetrieveAnswer = true;
            }
            else {
               scoreDiffMsg = this.strings.scoreStays;
            }
         } else {
            if (this.prevSavedScore != this.submittedScore) {
               scoreDiffMsg = this.strings.contestOverScoreStays + " " + this.prevSavedScore + ". " + this.strings.scoreWouldBecome;
            } else if (this.submittedAnswer != this.savedAnswer) {
               scoreDiffMsg = this.strings.contestOverScoreStays + " " + this.prevSavedScore + ". " + this.strings.scoreWouldStay;
            } else {
               scoreDiffMsg = this.strings.scoreIs;
            }
         }
      }
      scoreDiffMsg += " " + this.graderScore + this.strings.outOf + this.taskParams.maxScore + ".";
      if ((this.hasSolution && this.savedAnswer != this.prevAnswer) ||
          (this.graderScore > 0 && (taskMode == 'saved_changed' || showRetrieveAnswer))) {
          scoreDiffMsg += ' <a href="#" onclick="displayHelper.retrieveAnswer(); return false;">Rechargez la réponse validée.</a>';
      }
      return scoreDiffMsg;
   },
   getFullFeedbackWithLevelsSavedMessage: function() {
      var maxScoreLevel = this.levelsMaxScores[this.taskLevel];
      var showRetrieveAnswer = false;
      var message = "";
      var curAnswer = this.submittedAnswer;
      var answerExists = false;
      if (curAnswer !== '') {
         curAnswer = $.parseJSON(curAnswer);
         answerExists = !$.isEmptyObject(curAnswer);
      }
      if (!answerExists) {
         if (this.levelsScores[this.taskLevel] > 0) {
            showRetrieveAnswer = true;
         } else {
            message += this.strings.noPointsForLevel;
         }
      } else {
         var strPoint = this.strings.point;
         if (this.submittedScore > 1) {
            strPoint = this.strings.points;
         }
         message = this.strings.scoreObtained + ' <span id="answerScore">' + this.submittedScore + " " + strPoint + " " + this.strings.outOf + " " + maxScoreLevel + ".</span><br/>";
         if (this.hasSolution) {
            message += this.strings.contestOverAnswerNotSaved;
            if (this.prevSavedScore !== undefined) {
               showRetrieveAnswer = true;
            }
         } else {
            var prevScore = this.prevLevelsScores[this.taskLevel];
            if (this.prevSavedScore !== undefined) {
               if (this.submittedScore > prevScore) {
                  if (this.submittedScore < maxScoreLevel) {
                     if (this.taskLevel == "hard") {
                        message += this.strings.tryToDoBetterOrChangeTask;
                     } else {
                        message += this.strings.tryToDoBetterOrMoveToNextLevel;
                     }
                  } else if (this.taskLevel == "hard") {
                     message += this.strings.bestPossibleScoreCongrats;
                  } else {
                     message += this.strings.forMorePointsMoveToNextLevel;
                  }
               } else if (this.submittedScore < prevScore) { 
                  message += this.strings.youDidBetterBefore;
                  showRetrieveAnswer = true;
               }
               else {
                  message += this.strings.scoreStays2;
               }
            }
         }
      }
      if (showRetrieveAnswer) {
         message += ' <a href="#" onclick="displayHelper.retrieveAnswer(); return false;">' + this.strings.reloadBestAnswer + '</a>';
      }
      return message;
   },
   getFullFeedbackGraderMessage: function(taskMode) {
      switch (taskMode) {
         case 'saved_unchanged':
            var color = 'red';
            if (this.submittedScore == this.taskParams.maxScore) {
               color = 'green';
            } else if (this.submittedScore > 0) {
               color = '#ff8c00';
            }
            if (this.graderMessage !== "") {
               if (!this.stoppedShowingResult) {
                  return '<div style="margin: .2em 0; color: ' + color + '; font-weight: bold;">' + this.graderMessage + '</div>';
               } 
            }
            break;
      }
      return '';
   },
   // TODO: rename function below to getFullFeedbackValidate, assuming it is not called from outside this file
   getFullFeedbackValidateMessage: function(taskMode, disabledStr) {
      switch (taskMode) {
         case 'saved_unchanged':
            if (this.graderMessage !== "") {
               if (!this.hideValidateButton && !this.hasSolution) {
                  return '<input type="button" value="' + this.strings.validate + '" onclick="platform.validate(\'done\', function(){});" ' +
                     disabledStr + '/>';
               }
            }
            break;
         case 'unsaved_unchanged':
         case 'unsaved_changed':
            if (!this.hideValidateButton) {
               if (this.hasSolution) {
                  return '<input type="button" value="' + this.strings.gradeThisAnswer + '" onclick="displayHelper.validate(\'test\');" ' +
                     disabledStr + '/>';
               } else {
                  return '<input type="button" value="' + this.strings.validate + '" onclick="platform.validate(\'done\', function(){});" ' +
                     disabledStr + '/>';
               }
            }
            break;
         case 'saved_changed':
            if (!this.hideValidateButton) {
               if (this.hasSolution) {
                  return '<input type="button" value="' + this.strings.gradeThisAnswer + '" onclick="displayHelper.validate(\'test\');" ' +
                     disabledStr + '/>';
               } else {
                  // was: “Valider votre nouvelle réponse”
                  return '<input type="button" value="' + this.strings.validate + '" onclick="platform.validate(\'done\', function(){});" ' +
                     disabledStr + '/>';
               }
            }
            break;
      }
      return '';
   },

   lastSentHeight: null,
   updateMessages: function() {
      this.initLanguage();
      var self = this;
      this.refreshMessages = false;
      var suffix, prefix; 
      if (this.hasAnswerChanged) {
         suffix = 'changed';
      } else {
         suffix = 'unchanged';
      }
      if (this.savedAnswer !== '' && this.savedAnswer != this.defaultAnswer) {
         prefix = 'saved';
      } else {
         prefix = 'unsaved';
      }
      if (this.submittedAnswer !== '' && this.submittedAnswer != this.savedAnswer) {
         prefix = 'saved'; // equivalent, should be named differently
         suffix = 'unchanged';
      }
      var taskMode = prefix + '_' + suffix;
      var messages = { graderMessage: '', validate: '', cancel: '', saved: '' };
      var disabledStr = this.readOnly ? ' disabled' : '';
      if (this.showScore) {
         if (!this.hideRestartButton) {
            messages.cancel = '<input type="button" value="' + this.strings.restart + '" onclick="displayHelper.restartAll();"' +
               disabledStr + '/></div>';
         }
         messages.graderMessage = this.getFullFeedbackGraderMessage(taskMode);
         messages.validate = this.getFullFeedbackValidateMessage(taskMode, disabledStr);
         if (this.hasLevels) {
            messages.saved = this.getFullFeedbackWithLevelsSavedMessage(taskMode);
         } else {
            messages.saved = this.getFullFeedbackSavedMessage(taskMode);
         }
      } else {
         switch (taskMode) {
            case 'unsaved_unchanged':
            case 'unsaved_changed':
               if (!this.hasSolution) {
                  messages.validate = '<input type="button" value="' + this.strings.saveAnswer + '" ' +
                     'onclick="platform.validate(\'done\', function(){})" ' + disabledStr + '/>';
               }
               break;
            case 'saved_unchanged':
               if (!this.hasSolution) {
                  messages.saved = this.formatTranslation(this.strings.answerSavedModifyOrCancelIt,
                     ["<a href='#' onclick=\"platform.validate('cancel', function(){}); return false;\" " + disabledStr + ">" + this.strings.cancelIt + "</a>"]);
               } else {
                  messages.saved = this.formatTranslation(this.strings.answerNotSavedContestOver,
                     ["<a href='#' onclick=\"displayHelper.validate('cancel'); return false;\" " + disabledStr + ">" + this.strings.reloadSubmittedAnswer + "</a>"]);
               }
               break;
            case 'saved_changed':
               messages.saved = "<br/><b style='color: red;'>" + this.strings.warningDifferentAnswerSaved + "</b> " +
                  this.formatTranslation(this.strings.youMay, ["<a href='#' onclick='displayHelper.retrieveAnswer(); return false;'>" + this.strings.reloadIt + "</a>"]);
               if (!this.hideValidateButton) {
                  messages.validate = "<input type='button' value='" + this.strings.saveThisNewAnswer + "' onclick=\"platform.validate('done', function(){})\" " + disabledStr + "/>";
               }
               break;
         }
      }
      for (var type in messages) {
         if (this.loaded && (typeof this.previousMessages[type] === 'undefined' || this.previousMessages[type] !== messages[type])) {
            $('#displayHelper_' + type).html(messages[type]);
            this.previousMessages[type] = messages[type];
         }
      }
      if (this.pointsAsStars && $('#answerScore').length) {
         drawStars('answerScore', this.levelsRanks[this.taskLevel] + 2, 20,
            this.levelsScores[this.taskLevel] / this.levelsMaxScores[this.taskLevel], 'normal');
      }
      window.task.getHeight(function(height) {
         if (height != self.lastSentHeight) {
            self.lastSentHeight = height;
            window.platform.updateHeight(height, function(){});
         }
      });
   },

   // Loads previously saved answer
   retrieveAnswer: function() {
      var retrievedAnswer;
      if (this.hasLevels) {
         var retrievedAnswerObj = task.getAnswerObject();
         var savedAnswerObj = $.parseJSON(this.savedAnswer);
         retrievedAnswerObj[this.taskLevel] = savedAnswerObj[this.taskLevel];
         retrievedAnswer = JSON.stringify(retrievedAnswerObj);
      } else {
         retrievedAnswer = this.savedAnswer;
      }
      var self = displayHelper;
      task.reloadAnswer(retrievedAnswer, function() {
         self.submittedAnswer = self.savedAnswer;
         self.updateScore(self.savedAnswer, false, function() {});
      });
   },

   sendBestScore: function(callback, scores, messages) {
      var bestLevel = 'easy';
      for (var curLevel in scores) {
         if (scores[bestLevel] <= scores[curLevel]) {
            bestLevel = curLevel;
         }
      }
      callback(scores[bestLevel], messages[bestLevel] + " (" + this.strings["levelVersionName_" + bestLevel] + ")");
   }
};


/*
   draw nbStars stars of width starWidth in element of id id
   fills rate% of them in yellow from the left
   mode is "norma", "locked" or "useless"
*/
function drawStars(id, nbStars, starWidth, rate, mode) {
   $('#' + id).addClass('stars');

   function clipPath(coords, xClip) {
      var result = [[coords[0][0], coords[0][1]]];
      var clipped = false;
      for (var iCoord = 1; iCoord <= coords.length; iCoord++) {
         var x1 = coords[iCoord - 1][0];
         var y1 = coords[iCoord - 1][1];
         var x2 = coords[iCoord % coords.length][0];
         var y2 = coords[iCoord % coords.length][1];
         if (x2 > xClip) {
            if (!clipped) {
               result.push([xClip, y1 + (y2 - y1) * (xClip - x1) / (x2 - x1)]);
               clipped = true;
            }
         } else {
            if (clipped) {
               result.push([xClip, y1 + (y2 - y1) * (xClip - x1) / (x2 - x1)]);
               clipped = false;
            }
            result.push([x2, y2]);
         }
      }
      result.pop();
      return result;
   }

   function pathFromCoords(coords) {
      var result = 'm' + coords[0][0] + ',' + coords[0][1];
      for (var iCoord = 1; iCoord < coords.length; iCoord++) {
         var x1 = coords[iCoord - 1][0];
         var y1 = coords[iCoord - 1][1];
         var x2 = coords[iCoord][0];
         var y2 = coords[iCoord][1];
         result += ' ' + (x2 - x1) + ',' + (y2 - y1);
      }
      result += 'z';
      return result;
   }

   var fillColors = { normal: 'white', locked: '#ddd', useless: '#ced' };
   var strokeColors = { normal: 'black', locked: '#ddd', useless: '#444' };
   var starCoords = [[25, 60], [5, 37], [35, 30], [50, 5], [65, 30], [95, 37], [75, 60], [78, 90], [50, 77], [22, 90]];
   var fullStarCoords = [
      [[5, 37], [35, 30], [50, 5], [65, 30], [95, 37], [75, 60], [25, 60]],
      [[22, 90], [50, 77], [78, 90], [75, 60], [25, 60]]
   ];

   
   if ($('#' + id).length == 0) {
      return;
   }
   $('#' + id).html('');
   var paper = new Raphael(id, starWidth * nbStars, starWidth * 0.95);
   for (var iStar = 0; iStar < nbStars; iStar++) {
      var scaleFactor = starWidth / 100;
      var deltaX = iStar * starWidth;
      var coordsStr = pathFromCoords(starCoords, iStar * 100);

      paper.path(coordsStr).attr({
         fill: fillColors[mode],
         stroke: 'none'
      }).transform('s' + scaleFactor + ',' + scaleFactor + ' 0,0 t' + (deltaX / scaleFactor) + ',0');
      
      var ratio = Math.min(1, Math.max(0, rate * nbStars  - iStar));
      var xClip = ratio * 100;
      if (xClip > 0) {
         for (var iPiece = 0; iPiece < fullStarCoords.length; iPiece++) {
            var coords = clipPath(fullStarCoords[iPiece], xClip);
            var star = paper.path(pathFromCoords(coords)).attr({
               fill: '#ffc90e',
               stroke: 'none'
            }).transform('s' + scaleFactor + ',' + scaleFactor + ' 0,0 t' + (deltaX / scaleFactor) + ",0");
         }
      }
      paper.path(coordsStr).attr({
         fill: 'none',
         stroke: strokeColors[mode],
         'stroke-width': 5 * scaleFactor
      }).transform('s' + scaleFactor + ',' + scaleFactor + ' 0,0 t' + (deltaX / scaleFactor) + ',0');
   }
}


window.platform.subscribe(displayHelper);

})();
