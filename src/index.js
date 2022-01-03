const radix = 10;

function getDigitArray(number, numberLength) {
    let digitArray = [];
    let i = 0;
    let tempNumber = 0;
    while (number >= radix) {
        tempNumber += Math.floor(number % radix) * (radix ** i);
        if(++i == numberLength){
            digitArray.push(tempNumber);
            tempNumber = 0;
            i = 0;
        }
        number /= radix;
    }
    tempNumber += Math.floor(number % radix) * (radix ** i);
    digitArray.push(tempNumber);
    return digitArray;
}

function hundredsToText(number){
    let humanReadable = "";
    let firstForm = {
        0: "zero",
        1: "one",
        2: "two",
        3: "three",
        4: "four",
        5: "five",
        6: "six",
        7: "seven",
        8: "eight",
        9: "nine"
    };
    if (number < 9)
        return humanReadable += firstForm[number];
    let secondForm = {
        2: "twen",
        3: "thir",
        4: "for",
        5: "fif",
        6: "six",
        7: "seven",
        8: "eigh",
        9: "nine"
    };
    let digitArray = getDigitArray(number, 1);
    for (let i = digitArray.length - 1; i >= 0; i--) {        
        if (i == 0 && digitArray[i] != 0){
            humanReadable += " " + firstForm[digitArray[i]];
        }
        else if(digitArray[i] == 0) continue;
        else if(i>1) {
            humanReadable += " " + firstForm[digitArray[i]] + " hundred";
        }
        else if (i == 1) {
            if (digitArray[i] == 1) {
                if (digitArray[i - 1] == 0) {
                    humanReadable += " ten";
                    i--;
                }
                else if (digitArray[i - 1] == 1) {
                    humanReadable += " eleven";
                    i--;
                }
                else if (digitArray[i - 1] == 2) {
                    humanReadable += " twelve";
                    i--;
                }
                else if (digitArray[i - 1] == 4) {
                    humanReadable += " " + firstForm[digitArray[i - 1]] + "teen";
                    i--;
                }
                else {
                    humanReadable += " " + secondForm[digitArray[i - 1]] + "teen";
                    i--;
                }
            }
            else {
                humanReadable += " " + secondForm[digitArray[i]] + "ty";
            }
        }
    }
    return humanReadable.trim();
}

module.exports = function toReadable (number) {
    let hundredsArray = getDigitArray(number, 3);
    let partsNumber = {
        0: "",
        1: "thousand",
        2: "million",
        3: "billion",
    }
    let humanReadable = "";
    for(let i = 0; i<hundredsArray.length;i++){
        humanReadable = hundredsToText(hundredsArray[i]) + " " + partsNumber[i] + " " + humanReadable;
    }
    return humanReadable.trim();
}

