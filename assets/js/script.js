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

    let train = new Train("Trainy", "Downtown", moment(`03:00 AM`, `hh:mm A`), 35);

    console.log(train.getProperties());

    console.log(train.setName("Traino"));

    console.log(train.getProperties());

    console.log(train.setDestination("Chicago"));

    console.log(train.getProperties());

    console.log(train.setFirstTrainTime(moment(`04:40 AM`, `hh:mm A`)));

    console.log(train.getProperties());

    console.log(train.setFrequency(50));

    console.log(train.nextArrival().format(`MM/DD/YYYY hh:mm A`));

    $(`body`).prepend(scheduler.getHTML);

});