/* Train object class defininition
    A Train object expects four initial parameters:
        - name: The name of the train, String
        - destination: The name of the train's destination, String
        - firstTrainTime: The time the first train leaves, a Moment.js object for the time (converts to Unix timestamp (s) for storage). Date is always today.
        - frequency: The frequency with which the train arrives in minutes, Integer 
        
    Defaults are "N/A", "N/A", 00:00:00 UTC, and 1, respectively*/
function Train(propertiesObject) {

    // Private properties
    let _name, _destination, _firstTrainTime, _frequency;

    // Private methods

    // Setter functions. All setters return 0 if successful and -1 if failed (bad input)
    // setName(newName) - Perform argument validation, set the name of the current Train object to newName or ""
    function _setName (newName) {
        if (typeof name === `string`) {
            _name = newName;
            return 0;
        }
        else {
            _name = "N\/A";
            return -1;
        }
    }

    // setDestination(newDestination) - Perform argument validation, set the name of current Train object's destination to newDestination or ""
    function _setDestination (newDestination) {
        if (typeof newDestination === `string`) {
            _destination = newDestination;
            return 0;
        }
        else {
            _destination = "N\/A";
            return -1;
        }
    }

    // setFirstTrainTime(newFirstTrainTime) - Perform argument validation, set the first train's arrival time to today and newFirstTrainTime or 00:00:00 UTC
    function _setFirstTrainTime (newFirstTrainTime) {
        if (newFirstTrainTime instanceof moment && newFirstTrainTime.isValid()) {
            _firstTrainTime = moment(`${moment().format(`MM/DD/YYYY`)} ${newFirstTrainTime.format(`hh:mm`)}`, `MM/DD/YYYY hh:mm`);
            return 0;
        }
        else {
            _firstTrainTime = moment(`21600`, `X`);
            return -1;
        }
    }

    // setFrequency(newFrequency) - Perform argument validation, set the frequency of Train's arrival to newFrequency or 1 (to avoid divide by zeros)
    function _setFrequency (newFrequency) {
        if (Number.isInteger(newFrequency)) {
            _frequency = newFrequency;
            return 0;
        }
        else {
            _frequency = 1;
            return -1;
        }
    }

    // nextArrival() returns a moment object of the time of the next train arrival
    function _nextArrival () {
        // Get the current Unix timestamp in seconds
        let now = Number.parseInt(moment().format(`X`));
        // Get the first train arrival as Unix timestamp in seconds
        let firstTrain = Number.parseInt(_firstTrainTime.format(`X`));
        // The difference between the frequency interval in seconds and the remainder of the time difference divided by the frequency interval in seconds is 
        // the amount of time until the next train in seconds.
        let secondsTillNextTrain = (_frequency * 60) - (now - firstTrain) % (_frequency * 60);
        return moment((now + secondsTillNextTrain).toString(), `X`);
    }

    // Initialize properties based on arguments (type checking, argument validation in methods)
    _setName(propertiesObject.name);
    _setDestination(propertiesObject.destination);
    _setFirstTrainTime(propertiesObject.firstTrainTime);
    _setFrequency(propertiesObject.frequency);

    // Return encapsulated object
    return {
        // === Public methods ===

        // Get methods
        getName: () => _name,
        getDestination: () => _destination,
        getFirstTrainTime: () => _firstTrainTime,
        getFrequency: () => _frequency,
        getProperties: () => ({
            name: _name,
            destination: _destination,
            firstTrainTime: _firstTrainTime.format(`MM/DD/YYYY hh:mm A`),
            frequency: _frequency
        }),
        nextArrival: _nextArrival,

        // Set methods (return instances of private setter methods)
        setName: _setName,
        setDestination: _setDestination,
        setFirstTrainTime: _setFirstTrainTime,
        setFrequency: _setFrequency
    }

}