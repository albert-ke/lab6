'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);

	console.log("User clicked on project " + idNumber);

	var getURL = "/project/" + String(idNumber);
	console.log(getURL);
	$.get(getURL, showProject);	
	
	var panoramio = "http://www.panoramio.com/map/get_panoramas.php?set=public&from=0&to=20&minx=-180&miny=-90&maxx=180&maxy=90&size=medium&mapfilter=true"
	$.get(panoramio, showPicture, 'jsonp');
}

function showPicture(result) {
	console.log(result);
	var image = result["photos"][1]["photo_file_url"];
	console.log(result["photos"][1]["photo_url"]);

	$('.jumbotron').css('background', 'url(' + image + ') no-repeat center');
}
/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
	console.log("User clicked on color button");	
	
	$.get("/palette", displayColors);
}

function displayColors(result) {
	var colors = result.colors["hex"];
	console.log(colors);
	$('body').css('background-color', colors[0]);
	$('.thumbnail').css('background-color', colors[1]);
	$('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
	$('p').css('color', colors[3]);
	$('.project img').css('opacity', .75);
}

function showProject(result) {
	console.log(result);
	console.log("#project" + String(result.id) + " .details");
	$("#project" + String(result.id) + " .details").html(result.summary);
}
