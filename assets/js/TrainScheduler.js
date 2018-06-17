function TrainScheduler(firebaseObj) {

    // Private properties
    let _firebase = firebaseObj;
    let _database = _firebase.database();

    // Private methods
    function _renderTrains() {
        let $trainBody = $(`#trainBody`);

        _database.ref().once("value").
            then(function (snapshot) {

                $.each(snapshot.val(), function (key, trainObj) {
                    
                    let $newRow = $(`<tr>`).attr(`id`, `train${key}`);
                    let thisTrain = new Train(trainObj);

                    $newRow.
                        append($(`<td>`).text(trainObj.name)).
                        append($(`<td>`).text(trainObj.destination)).
                        append($(`<td>`).text(trainObj.frequency)).
                        append($(`<td>`).text( thisTrain.nextArrival().format(`hh:mm A`) )).
                        append($(`<td>`).text( Math.ceil(((Number.parseInt(thisTrain.nextArrival().format(`X`)) - Number.parseInt(moment().format(`X`))) / 60)).toString() ));

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

        let $formCard = $(`<div>`).
            attr(`class`, `card`).
            attr(`id`, `formCard`).
            append(
                $(`<h5>`).
                    attr(`class`, `card-header`).
                    text(`Add Train`)
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
                                $(`<th>`).attr(`scope`, `col`).text(``),
                                $(`<th>`).attr(`scope`, `col`).text(``),
                        )
                    )
            );

        // Add the trains
        $trainTable.append(
            $(`<tbody>`).attr(`id`, `trainBody`)
        );

        // Create form

        // Append everything together
        $trainTableWrapper.append($trainTable);
        $trainTableCard.append($trainTableWrapper);
        $tableCard.append($trainTableCard);

        $mainContainer.
            append(
                $jumbotron,
                $tableCard
            );

        return $mainContainer;

    }

    // Return encapsulated object
    return {
        // Getter Methods
        renderScheduler: () => { return _renderBaseHTML() },

        // Setter Methods
        addTrain: (trainObject) => {
            _database.ref().push(trainObject);
        },

        renderTrains: () => {
            _renderTrains();
        }

    };

}