    function calculateResult() {
        let score = 0;

        let q1 = document.querySelector('input[name="q1"]:checked');
        let q2 = document.querySelector('input[name="q2"]:checked');
        let q3 = document.querySelector('input[name="q3"]:checked');

        if (!q1 || !q2 || !q3) {
            document.getElementById("result").innerText = "Molimo odgovori na sva pitanja!";
            return;
        }

        score += parseInt(q1.value);
        score += parseInt(q2.value);
        score += parseInt(q3.value);

        let resultText = "";

        if (score <= 3) {
            resultText = "Ti si Khabib ";
        } 
        else if( score <= 5) {
            resultText = "Ti si Dustin Poirier!";
        }else if (score <= 6) {
            resultText = "Ti si Connor mcgregor!";
        } else if (score <= 9) {
            resultText = "Ti si Jon jones!";
        }

        document.getElementById("result").innerText = resultText;
    }
