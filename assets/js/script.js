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

});