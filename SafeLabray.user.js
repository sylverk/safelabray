// ==UserScript==
// @name         Safe Labray
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Hide protected pets, auto select current lab pet
// @author       sylverk
// @match        http://www.neopets.com/lab2.phtml
// @grant        none
// ==/UserScript==

(function() {

// Check this section for initial setup ----------------------------------------------------------------------------------------

    const PROTECTED_PETS = [
    // Make a comma seperated list of the pets you don't want to zap by mistake, with each pet name in quotes.
    // If you only have one pet you want to protect, just put the name in quotes with no comma after.
        'Pet_1', 'Neopet2'
    ];
    // You can optionally change the blurb of your protected pets here.
    const SAFE_TEXT = "Phew! I'm safe from the labray :)";

    // If you want your lab pet to be automatically selected, set USE_LABRAT = true; else, make it false;
    // If you set this to false, the the LABRAT_NAME and LABRAT_TEXT values will be ignored.
    const USE_LABRAT = false;
    // If you chose true, set the name of your lab pet here.
    const LABRAT_NAME = 'Petname99';
    // You can optionally change the blurb of your lab pet here.
    const LABRAT_TEXT = "Woe is me :(";

// DO NOT MOTIFY ANYTHING BEYOND THIS POINT ------------------------------------------------------------------------------------

    const targetNode = document.getElementsByClassName('bx-wrapper')[0];
    const config = { attributes: true, childList: true, subtree: true };

    const callback = function(mutationsList, observer) {
        for(let mutation of mutationsList) {
            if (mutation.removedNodes.length > 0 && mutation.removedNodes[0].className === 'bx-loading'){
                let $pets = $('#bxlist div').not('.bx-clone');
                $pets.each(function(){
                    let $input = $(this).find('input');
                    let this_pet_name = $input.val();

                    if (USE_LABRAT === true & this_pet_name === LABRAT_NAME){
                        $(this).find('b').text(LABRAT_TEXT);
                        $input.prop('checked', 'true');
                    } else {
                        for (var i = 0; i < PROTECTED_PETS.length; i++){
                            if (PROTECTED_PETS[i] === this_pet_name){
                                $input.prop('disabled','true');
                                $(this).find('b').text(SAFE_TEXT);
                                $(this).find('img').css('filter', 'grayscale(100%)');
                            }
                        }
                    }
                });
            }
        }
        observer.disconnect();
    };

    const observer = new MutationObserver(callback);

    observer.observe(targetNode, config);



})();