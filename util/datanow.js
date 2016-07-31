const fs = require('fs');
const path = require('path');

function updateProblems(problems) {
    let probs = {};
    for (let i = 0; i < problems.length; i++) {
        let problem = problems[i];
        problem.id = i;
        if (!probs[problem.uid]) {
            probs[problem.uid] = {
                code: 0,
                extData: [
                    problem
                ]
            };
        } else {
            probs[problem.uid].extData.push(problem);
        }
    }
    return probs;
}

function updateAnswers(answers, problems) {
    let answs = {};
    for (let i = 0; i < answers.length; i++) {
        let answer = answers[i];
        answer.id = i;
        let problem = problems[answer.feedbackid];
        problem.id = answer.feedbackid;
        if (!answs[answer.feedbackid]) {
            answs[answer.feedbackid] = {
                code: 0,
                extData: {
                    problem: problem,
                    answerList: [
                        answer
                    ]
                }
            };
        } else {
            answs[answer.feedbackid].extData.answerList.push(answer);
        }
    }
    return answs;
}


fs.readFile(path.join('..', './public/data/dbPro.json'), 'utf-8', (err, data) => {
    if (err) throw err;
    let problems = JSON.parse(data);
    let probs = updateProblems(problems);
    fs.writeFile(path.join('..', './public/data/probs.json'), JSON.stringify(probs, null, '    '), (err) => {
        if (err) throw err;
        console.log('probs.json saved');
    });
    fs.readFile(path.join('..', './public/data/dbAns.json'), 'utf-8', (err, data) => {
        if (err) throw err;
        let answs = updateAnswers(JSON.parse(data), problems);
        fs.writeFile(path.join('..', './public/data/answs.json'), JSON.stringify(answs, null, '    '), (err) => {
            if (err) throw err;
            console.log('answs.json saved');
        });
    });
});