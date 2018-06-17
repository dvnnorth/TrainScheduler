function TrainScheduler(firebaseObj) {

    // Private properties
    let _firebase = firebaseObj;
    let _database = _firebase.database();

    // Private methods
    function _renderTrains() {
        let $trainBody = $(`#trainBody`);

        $trainBody.empty();

        _database.ref().once("value").
            then(function (snapshot) {

                $.each(snapshot.val(), function (key, trainObj) {

                    let $newRow = $(`<tr>`).attr(`id`, `train` + key);
                    let thisTrain = new Train(trainObj);

                    $newRow.
                        append($(`<td>`).text(trainObj.name)).
                        append($(`<td>`).text(trainObj.destination)).
                        append($(`<td>`).text(trainObj.frequency)).
                        append($(`<td>`).attr(`class`, `nextArrival`).text(thisTrain.nextArrival().format(`hh:mm A`))).
                        append($(`<td>`).attr(`class`, `minutesAway`).text(Math.ceil(((Number.parseInt(thisTrain.nextArrival().format(`X`)) - Number.parseInt(moment().format(`X`))) / 60)).toString())).
                        append($(`<td>`).attr({id: `deleteTrain`, [`data-todelete`]: key}).html(`<i class="far fa-window-close"></i>`));

                    $trainBody.append($newRow);

                });

            });
    }

    function _renderBaseHTML() {

        // Initialize grid
        let $mainContainer = $(`<div>`).
            attr(`class`, `container`).
            attr(`id`, `mainContainer`);

        let $jumbotron = $(`<div>`).
            attr(`class`, `jumbotron`).
            attr(`id`, `jumbotron`).
            append(
                ($(`<h2>`).
                    attr(`class`, `text-center display-2`).
                    text(`Train Scheduler`))
            );

        let $tableCard = $(`<div>`).
            attr(`class`, `card`).
            attr(`id`, `tableCard`).
            append(
                $(`<h5>`).
                    attr(`class`, `card-header`).
                    text(`Current Train Schedule`)
            );

        // Create table
        let $trainTableCard = $(`<div>`).
            attr(`class`, `card-body`).
            attr(`id`, `trainTableCard`);

        let $trainTableWrapper = $(`<div>`).
            attr(`class`, `table-responsive`);

        let $trainTable = $(`<table>`).
            attr(`class`, `table table-striped table-hover table-sm`).
            append(
                $(`<thead>`).
                    append(
                        $(`<tr>`).
                            append(
                                $(`<th>`).attr(`scope`, `col`).text(`Train Name`),
                                $(`<th>`).attr(`scope`, `col`).text(`Destination`),
                                $(`<th>`).attr(`scope`, `col`).text(`Frequency (min)`),
                                $(`<th>`).attr(`scope`, `col`).text(`Next Arrival`),
                                $(`<th>`).attr(`scope`, `col`).text(`Minutes Away`),
                                $(`<th>`).attr(`scope`, `col`).text(``)
                        )
                    )
            );

        // Add the train body
        $trainTable.append(
            $(`<tbody>`).attr(`id`, `trainBody`)
        );

        // Create form
        let formGroups = [
            {
                text: "Train Name",
                id: "trainName",
                placeholder: "Enter name of new train"
            },
            {
                text: "Destination",
                id: "destination",
                placeholder: "Enter destination"
            },
            {
                text: "First Train Time (HH:MM in 24-hr time / Military Time)",
                id: "firstTrainTime",
                placeholder: "19:00"
            },
            {
                text: "Frequency (in minutes)",
                id: "frequency",
                placeholder: "35"
            }
        ];
        let $formCard = $(`<div>`).
            attr(`class`, `card`).
            attr(`id`, `formCard`).
            append(
                $(`<h5>`).
                    attr(`class`, `card-header`).
                    text(`Add a Train`)
            );

        let $formCardBody = $(`<div>`).
            attr(`class`, `card-body`).
            attr(`id`, `formCardBody`);

        let $form = $(`<form>`).
            attr(`id`, `newTrainForm`);

        $.each(formGroups, function (index, object) {
            let $newFormGroup = $(`<div>`).attr(`class`, `form-group`);
            $newFormGroup.append(
                $(`<label>`).
                    attr(`for`, object.id).
                    text(object.text),
                $(`<input>`).
                    attr({
                        type: `text`,
                        class: `form-control`,
                        id: object.id,
                        placeholder: object.placeholder
                    })
            );
            $form.append($newFormGroup);
        });

        let $submitButton = $(`<button>`).
            attr({
                type: `submit`,
                class: `btn btn-primary`,
                id: `submitButton`
            }).
            text(`Submit`);
        $form.append($submitButton);

        // Append everything together
        $trainTableWrapper.append($trainTable);
        $trainTableCard.append($trainTableWrapper);
        $tableCard.append($trainTableCard);
        $formCardBody.append($form);
        $formCard.append($formCardBody);

        $mainContainer.
            append(
                $jumbotron,
                $tableCard,
                $formCard
            );

        return $mainContainer;

    }

    function _updateTimes() {
        _database.ref().once(`value`)
            .then(function (snapshot) {
                $.each(snapshot.val(), function (key, trainObj) {

                    let $row = $(`#train` + key);
                    let thisTrain = new Train(trainObj);

                    $row.children(`.nextArrival`).text(thisTrain.nextArrival().format(`hh:mm A`));
                    $row.children(`.minutesAway`).text(Math.ceil(((Number.parseInt(thisTrain.nextArrival().format(`X`)) - Number.parseInt(moment().format(`X`))) / 60)).toString());

                });
            });
    }

    // Return encapsulated object
    return {
        // Getter Methods
        renderScheduler: () => { return _renderBaseHTML() },

        // Setter Methods
        addTrain: (trainObject) => {
            _database.ref().push(trainObject.getProperties());
        },

        renderTrains: () => {
            _renderTrains();
        },

        updateTimes: () => {
            _updateTimes();
        }

    };

}