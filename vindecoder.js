//function for decoding VIN entered by user
function decodeVIN(event) {
    //prevent the default behaviour of button click causing page refresh
    event.preventDefault();
    //read and store the VIN that the user inputs
    const vin = document.getElementById('vin-input').value.toUpperCase().trim();

    // This will hold the build information
    let result = "";

    //check if VIN is valid 17 character VIN
    if (vin.length !== 17) {
        //yield result of invalid vin
        result = `<p style="color: red;">Not a valid VIN. Please enter a valid 17-character VIN.</p>`;
    //check if VIN is ZE1 VIN
    } else if (vin.slice(3, 6) !== "ZE1") {
        //yield result of vin not being for ZE1
        result = `<p style="color: red;">This VIN does not belong to a Gen 1 Insight.</p>`;
    } else {
        //initialize variables for storing build info
        let transmission = "";
        let airCon = "";
        let modelYear = "";
        let prodPlant = "";
        let market = "";

        //decode transmission
        if (vin[6] === "3") {
            transmission = "Manual";
        } else if (vin[6] === "4") {
            transmission = "CVT";
        } else {
            transmission = "Unknown Transmission Type";
        }

        //decode air conditioning
        if (vin[7] === "5") {
            airCon = "Factory Non AC";
        } else if (vin[7] === "7") {
            airCon = "Factory AC";
        } else {
            airCon = "Unknown AC Type";
        }

        //decode model year
        if (vin[9] === "Y") {
            modelYear = "2000";
        } else if ("1" <= vin[9] && vin[9] <= "6") {
            modelYear = "200" + vin[9];
        } else {
            modelYear = "Unknown Model Year";
        }

        //decode production plant
        if (vin[10] === "T") {
            prodPlant = "Tochigi";
        } else if (vin[10] === "S") {
            prodPlant = "Suzuka";
        } else {
            prodPlant = "Unknown Production Plant";
        }

        //decode production market
        if (vin[11] === "0") {
            market = "US";
        } else if (vin[11] === "2") {
            market = "UK/Europe";
        } else if (vin[11] === "8") {
            market = "Canada";
        } else {
            market = "Unknown Market";
        }

        //construct the result of build info
        result = `
        <h3>Information on <strong>${vin}</strong></h3>
        <p>Model Year: <strong>${modelYear}</strong><br>
        Transmission Type: <strong>${transmission}</strong><br>
        This vehicle is equipped with <strong>${airCon}</strong><br>
        This Insight was produced at the <strong>${prodPlant}</strong> plant for the <strong>${market}</strong> market</p>
        `;
    }

    //prepare text to be passed to vin-result as well as to handle showing the result div
    const resultText = document.getElementById('vin-result');
    resultText.innerHTML = result;

    //logic to only show div once an input is made
    if (result) {
        resultText.style.display = 'block';
    } else {
        resultText.style.display = 'none';
    }
}