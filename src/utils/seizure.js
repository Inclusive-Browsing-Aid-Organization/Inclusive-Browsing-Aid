/*
 * https://flashing-colors.com/
 * https://stackoverflow.com/questions/3847121/how-can-i-disable-all-settimeout-events
 * var highestTimeoutId = setTimeout(";");
 * for (var i = 0 ; i < highestTimeoutId ; i++) {
 *     clearTimeout(i); 
 * }
 *
 */

export function disableAllTimeouts() {
  	var highestTimeoutId = setTimeout(function () {});
	for (var i = 0 ; i <= highestTimeoutId ; i++) {
		clearTimeout(i);
	}
}

/*
 * location.reload();
 * https://stackoverflow.com/questions/3715047/how-to-reload-a-page-using-javascript
 */

export function locationreload() {
	//location.reload();
	window.location.reload();
}
