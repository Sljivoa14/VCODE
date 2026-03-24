function analyzeEmail(emailObject) {
    let score = 0;
    let reasons = [];
    const { from, subject, body, links, attachments } = emailObject;

    const susFiles = [".xyz", ".biz", ".ru", ".cn", ".click" ];
const susWords = ["PRIZE", "WIN", "WINNER", "URGENT", "OFFER", "HURRY", "MONEY", "FREE", "CLICK", "BUY NOW", "LIMITED TIME", "ACT NOW", "RISK-FREE", "100% GUARANTEED"];
    const susWordsLower = susWords.map(word => word.toLowerCase());
    const suspiciousExtensions = [".exe", ".bat", ".js", ".scr", "tcl", ".vbs", ".cmd", ".cm", ".pif", ".jar"];

    const letters = subject.replace(/[^a-zA-Z]/g, ''); //moram naucit
    const upper = letters.replace(/[^A-Z]/g, ''); // moram naucit

    const exclamations = (subject + body).split("!").length - 1;
    const text = subject + " " + body;

    

    if(susFiles.some(domain => from.toLowerCase().includes(domain))){
        score += 30;
        reasons.push("Suspicious domain");
        console.log("Suspicious domain detected in 'from':", from);
    }

    /*some() prolazi kroz array i pita za svaki element: "je li uslov tačan?" 
    Čim jedan element vrati true — staje i vraća true. Ako nijedan ne vrati true — vraća false.*/

    // Ovo što some() radi iznutra:
// Korak 1: domain = ".biz"
//   from.includes(".biz") → "spam@money.biz".includes(".biz") → TRUE
//   → odmah vrati true, stani!

// Nikad ne dođe do ".ru" ili ".xyz"


    if(letters.length > 0 && upper.length / letters.length > 0.7){
        score += 40;
        reasons.push("Too many uppercase letters");
        console.log("Uppercase ratio:", upper.length / letters.length);
    }
    if(letters.length > 0 && upper.length / letters.length > 0.7){
        score += 40;
        reasons.push("Too many uppercase letters");
        console.log("Uppercase ratio:", upper.length / letters.length);
    }

    if(exclamations > 2){
        score += 20;
        reasons.push("Too many exclamation marks");
        console.log("Too many exclamation marks detected:", exclamations);
    }    

    let foundSusWords = [];

    susWords.forEach(word => {
        if (text.toUpperCase().includes(word)) {       // moram naucit
            foundSusWords.push(word);
        }
    });

    if(foundSusWords.length > 0){
        score += foundSusWords.length * 15;
        reasons.push("Suspicious words detected: " + foundSusWords.join(", "));
        console.log("Suspicious words detected:", foundSusWords);
    }

    if(links.length > 3){
        score += 25;
        reasons.push("Too many links");
        console.log("Too many links detected:", links.length);
    }
    
    links.forEach(link => {
        if (link.includes("bit.ly")) {
            score += 20;
            reasons.push("Shortened link detected");
            console.log("Shortened link detected:", link);
        }
        if (!link.startsWith("https")) {
            score += 15;
            reasons.push("Insecure link");
            console.log("Insecure link detected:", link);
        }
    });

    if ( body.length < 20) {
        score += 10;
        reasons.push("Email body is too short");
        console.log("Email body is too short");
    }

    //links.forEach(x => { if (x.includes("bit.ly")) ... })
        //links.forEach(svakiLink => { if (svakiLink.includes("bit.ly")) ... })
        //links.forEach(banana => { if (banana.includes("bit.ly")) ... })
                                                // moram naucit

    if(suspiciousExtensions.some(ext => attachments.some(att => att.endsWith(ext)))){
        score += 40;
        reasons.push("Suspicious attachment detected");
    }
    //VOCE.some(voce => NEZDRAVO_VOCE.some(otrov => voce===otrov ))
    //voce u VOCE; otrov u NEZDRAVO_VOCE;

    if(body.length < 20){
        score += 10;
        reasons.push("Email body is too short");
        console.log("Email body is too short");
    }

    return {
        score,
        isSpam: score >= 50,
        reasons
    };

    
}    

function checkEmail() {
    const emailObject = {
        from: document.getElementById("from").value,
        subject: document.getElementById("subject").value,
        body: document.getElementById("body").value,
        links: document.getElementById("links").value
            ? document.getElementById("links").value.split(",")
            : [],
        attachments: document.getElementById("attachments").value
            ? document.getElementById("attachments").value.split(",")
            : []

            
    };
    if (emailObject.from === "" || emailObject.subject === "" || emailObject.body === "") {
        alert("Please fill in the 'from', 'subject', and 'body' fields.");
        return;
    }


    const analysis = analyzeEmail(emailObject);

    const result = document.getElementById("result");
    result.textContent =   // moram naucit
        "Email analysis result: " + analysis.reasons.join(", ") + 
        "\nTotal score: " + analysis.score + 
        "\nThis email is " + (analysis.isSpam ? "SPAM" : "NOT SPAM") + ".";
}

//const uneseniLinks = document.getElementById("links").value;
// uneseniLinks je string, npr. "http://bit.ly, https://good.com" ili ""

/*if (uneseniLinks) {                    // ako string NIJE prazan
    links = uneseniLinks.split(",");   // podijeli po zarezu → array
} else {                               // ako je prazan ""
    links = [];                        // daj prazan array
}*/


/*const emailObject = {
    from: "spam@money.biz",
    subject: "WIN NOW!!!",
    body: "Click here for free money!",
    links: ["http://bit.ly/win"],
    attachments: ["virus.exe"]
};

// Ovo je što some() radi automatski, samo duže:
let found = false;
susFiles.forEach(domain => {
    if (from.includes(domain)) {
        found = true;
    }
});
if (found) { ... }

// some() je isto, samo kraće:
if (susFiles.some(domain => from.includes(domain))) { ... }
*/

