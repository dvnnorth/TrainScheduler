function TrainScheduler(firebaseObj) {

    // Private variables
    _HTML = _initializeHTML();
    _firebase = firebaseObj;
    _database = _firebase.database();

    // Private methods
    function _initializeHTML() {

        // Declare page content
        let $mainContainer = $(`<div>`).
            attr(`class`, `container`).
            attr(`id`, `mainContainer`);

        let $jumbotron = $(`<div>`).
            attr(`class`, `jumbotron`).
            attr(`id`, `jumbotron`).
            append(
                ($(`<h2>`).
                    attr(`class`, `text-center display-2`).
                    text(`Train Scheduler`)));
        
        let $rowTable = $(`<div>`).
            attr(`class`, `row`).
            attr(`id`, `rowTable`);

        let $colTable = $(`<div>`).
            attr(`class`, `col`).
            attr(`id`, `colTable`);
        
        let $rowAddTrain = $(`<div>`).
            attr(`class`, `row`).
            attr(`id`, `rowAddTrain`);

        let $colAddTrain = $(`<div>`).
            attr(`class`, `col`).
            attr(`id`, `colAddTrain`);

        // Append everything together
        $rowTable.append($colTable);
        $rowAddTrain.append($colAddTrain);

        $mainContainer.append($jumbotron).
            append($rowTable).
            append($rowAddTrain);

        return $mainContainer;

    }

    function _render () {
        
    }

    function _thump() {
        _HTML;
    }

    // Return encapsulated object
    return {
        getHTML: this.getHTML
    };

}

// Public methods
TrainScheduler.prototype.getHTML = () => {return _HTML};

TrainScheduler.prototype.addTrain = trainObject => {
    console.log(trainObject);
    return _HTML;
}