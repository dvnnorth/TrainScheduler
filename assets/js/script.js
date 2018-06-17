// On document ready
$(() => {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBR0BvTrIio7CRl8biQdp9C7I_mD54cfsI",
        authDomain: "train-scheduler-65543.firebaseapp.com",
        databaseURL: "https://train-scheduler-65543.firebaseio.com",
        projectId: "train-scheduler-65543",
        storageBucket: "train-scheduler-65543.appspot.com",
        messagingSenderId: "993445293931"
    };
    firebase.initializeApp(config);

    // Create our TrainScheduler object with the Firebase Database information
    let scheduler = new TrainScheduler(firebase);

    $(`body`).prepend(scheduler.renderScheduler());
    scheduler.renderTrains();

    $(document).on(`click`, `#submitButton`, function (event) {
        // Prevent form submission
        event.preventDefault();

        if ($(`#trainName`).val().trim() === "" || $(`#destination`).val().trim() === "" ||
            $(`#firstTrainTime`).val().trim() === "" || $(`#frequency`).val().trim() === "") {
                $(`#warning`).remove();
                $(`#submitButton`).after($(`<div>`).attr({class: `text-danger pt-3`, id: `warning`}).text(`Please make sure all of the above fields are filled out`));
                $(`#submitButton`).effect(`shake`);
        }
        else {
            $(`#warning`).remove();
            let trainProperties = {
                name: $(`#trainName`).val().trim(),
                destination: $(`#destination`).val().trim(),
                firstTrainTime: moment($(`#firstTrainTime`).val().trim(), `hh:mm`),
                frequency: Number.parseInt($(`#frequency`).val().trim())
            };
            let newTrain = new Train(trainProperties);
            $(`#newTrainForm`).trigger(`reset`);
            scheduler.addTrain(newTrain);
            scheduler.renderTrains();
        }
    });

    $(document).on(`click`, `#deleteTrain`, function (event) {
        let key = $(this).data(`todelete`);
        firebase.database().ref(key).set(null);
        scheduler.renderTrains();
    });

    setInterval(function () {
        scheduler.updateTimes();
    }, 60000);

});