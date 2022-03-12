# Mixed Messages

Codecademy portfolio project (part of [Full Stack Engineer Path](https://www.codecademy.com/learn/paths/full-stack-engineer-career-path)). Published on [GitHub Pages](https://bobcorthals.github.io/mixed_messages). 

## Contents

* [Description](#description)
* [Aims](#aims)
* [Technologies](#technologies)
* [Detailed description](#detailed-description)
* [Future optimalization](#future-optimalization)
* [Contact](#contact)

## Description

The [web page](https://bobcorthals.github.io/mixed_messages) contains a random quiz question generator based on user selection. The questions themselves are retrieved from the "Trivia API" (free JSON API) at [Open Trivia Database](https://opentdb.com/api_config.php).

### Aims

As per the project's description on [Codecademy](https://discuss.codecademy.com/t/about-the-portfolio-project-mixed-messages-category/535742), my aim was to build a message generator program using JavaScript. Since I also wanted to continue practicing my HTML and CSS skills, I've embedded my script in an HTML document (index.html).

### Technologies

* JavaScript
* HTML
* CSS
* Git and Github
* Markdown

### Detailed description

So, how does it work? When the user opens the [web page](https://bobcorthals.github.io/mixed_messages) for the first time, a selection form will show up. The user is asked to select both a *category* (mythology, history, art) and a *difficulty level* (easy, medium, hard). Clicking the button "Hit me!" will trigger an evaluation of the user input. There are two possibilities:
1. *Invalid input*. When the user fails to choose a valid option for either one of the forms or both, the select form(s) in question will get a red border, alerting the user to the error.
2. *Valid input*. With two valid options selected, an API request will be sent to a URL that uses the user's choices as input.*

In the case of (2), an async function is used to wait for the API request to be successful. Once the data has been received, a new piece of HTML is generated in JavaScript that includes the question and the multiple choices (in random order). The correct answer is stored in a variable. When the user hovers over the choices, the cursor will become a pointer, indicating to the user that these choices are clickable.

When the user clicks one of the possible answers, the selected option will be evaluated. There are again two possibilities:

1. *Wrong answer*. If the provided answer is wrong, the selected option will turn <span style="color:red">**red**</span> (with a black border), indicating to the user that the provided answer is incorrect. Additionally, a (randomized) comment will be added below the multiple choice range, explaining to the user that the answer is incorrect and encouraging the user to have another guess.

2. *Correct answer*. If the provided answer is correct, the selected option will turn <span style="color:green">**green**</span> (with a black border), indicating to the user that the provided answer is correct. At this point, the user will also lose the ability to click any of the options (i.e. the `onclick` events will be assigned the value `null`). In this case too, a (randomized) comment will appear underneath to congratulate the user for providing the correct answer. It will also contain an encouragement to generate a new question.

<sub>\* Note that the "Trivia API" actually allows the user to choose from a much larger category range. It is also possible to retrieve more than one question at a time, and to receive a `true` / `false` evaluation rather than a multiple choice range. For present purposes, we only want to retrieve 1 question at a time.</sub>

### Future optimalization

~~At any stage, it is possible for the user to click the button "Hit me!" to generate a new question. So, even if a current question has not yet been answered correctly. The UX, then, could be improved by adding a procedure to the *input evaluation*, which checks whether the window is still showing a question that requires a correct answer, a notification to the user if this is the case, and a request for input from the user on how to deal with this situation (e.g. "Proceed anyway / Go back and finish answering the question").~~ [Created a toggle for the `onclick` attribute of the `button` "Hit me!". Once fired, the initial event handler will disappear. Until the question is answered correctly, a different event handler will ask the user whether to generate a new question, despite the fact that there is still a question pending. Once a question is answered correctly, the regular `onclick` event handler will reappear.]

Another thing that may improve UX would be to include some sort of progress tracker ("How many questions have been answered?", "Score"). Finally, it should be noted that the full range of possible questions is quite limited. That means that the user may receive the same question again (the multiple choices are always in random order, though). Needless to say, it would be better to use some procedure to keep track of the questions that the user has already received and then exclude these questions as possible for new requests.

### Contact

This project was created by [@bobcorthals](https://github.com/bobcorthals). Feel free to reach out to me for any questions or comments.
