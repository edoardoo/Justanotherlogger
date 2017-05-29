var log = function(){

    var log = this;
    log.active = true;
    log.addTime = false;
    log.cssError = 'color: #d24436;';
    log.coloursSections = {};
    log.index = 0;
    log.colours = [
        '#6769c7',
        '#cc6d90',
        '#ceb16e',
        '#6da1bb',
        '#5aad75',
        '#ca865c',
        '#5373b9',
        '#bd5862',
        '#a6c368',
        '#50b590'];

    log.getColour = function( section ){

        var colour = null;
        if( typeof( log.coloursSections[section]) === 'undefined' ){
            colour = log.colours[ log.index ];
            log.increaseIndex();
            log.coloursSections[section] = {};
            log.coloursSections[section].colour = colour;
        }

        colour = log.coloursSections[section].colour;
        return colour;

    };

    log.increaseIndex = function(){

        if( log.index + 1 > log.colours.length -1){
            log.index = 0;
        }else{
            log.index++;
        }

    };

    log.debug = function( section, message, data ){

        if( log.active ){
            var time = '';
            var colour = log.getColour(section);
            if( log.addTime ){
                time = log.getTime();
            }
            console.log(
                time + '%c [' + section + '] %c' + message,
                'font-weight: bold; color:' + colour + ';' ,
                'color:' + colour + ';');
            if( typeof data !== 'undefined'){
                console.dir(data);
            }
        }

    };

    log.error = function( section, message , e){

        if( log.active ){

            console.log(  log.getTime()+ '%c Error in ' + section + ': ' + message, log.cssError );

            if( typeof e !== 'undefined'){
                console.dir(e);
            }
        }

    };

    log.getTime = function(){

        return new Date().getTime();

    };

    return {

        debug: log.debug,
        error: log.error

    };

};

log = log();
