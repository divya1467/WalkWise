let map;
let directionsService;
let directionsRenderer;
let autocompleteSource, autocompleteDestination;

let customPolylines = [];
let selectedPolyline = null;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 12.9716, lng: 77.5946 }, // Bengaluru
        zoom: 13,
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({ suppressPolylines: true });

    directionsRenderer.setMap(map);

    const sourceInput = document.getElementById("source");
    const destinationInput = document.getElementById("destination");

    autocompleteSource = new google.maps.places.Autocomplete(sourceInput);
    autocompleteDestination = new google.maps.places.Autocomplete(destinationInput);
}

function calculateRoute() {
    const source = document.getElementById("source").value;
    const destination = document.getElementById("destination").value;
    const travelMode = document.getElementById("travelMode").value;

    if (!source || !destination) {
        alert("Please enter both source and destination.");
        return;
    }

    clearPreviousRoutes(); // Clear all old routes before drawing new ones

    const request = {
        origin: source,
        destination: destination,
        travelMode: google.maps.TravelMode[travelMode],
        provideRouteAlternatives: true,
    };

    directionsService.route(request, (result, status) => {
        if (status === "OK") {
            // Show panel if needed
            directionsRenderer.setDirections(result);

            result.routes.forEach((route, index) => {
                const color = pickColor(index);

                const polyline = new google.maps.Polyline({
                    path: route.overview_path,
                    strokeColor: color,
                    strokeOpacity: 0.7, // dimmed by default
                    strokeWeight: 4,
                    map: map,
                });

                polyline.routeIndex = index;
                polyline.routeData = route;
                polyline.routeColor = color;

                polyline.addListener("click", () => {
                    highlightRoute(polyline);
                });

                customPolylines.push(polyline);
            });

            // Auto-highlight the fastest route (typically the first one)
            highlightRoute(customPolylines[0]);
        } else {
            alert("Directions request failed due to: " + status);
        }
    });
}

function clearPreviousRoutes() {
    customPolylines.forEach(poly => poly.setMap(null));
    customPolylines = [];
    if (selectedPolyline) {
        selectedPolyline.setMap(null);
        selectedPolyline = null;
    }
}

function highlightRoute(polyline) {
    if (selectedPolyline) {
        selectedPolyline.setMap(null);
    }

    const highlighted = new google.maps.Polyline({
        path: polyline.routeData.overview_path,
        strokeColor: polyline.routeColor,
        strokeOpacity: 1,
        strokeWeight: 6,
        map: map,
        zIndex: 1000,
    });

    selectedPolyline = highlighted;
}

function pickColor(index) {
    const colors = ["#1E88E5", "#43A047", "#FDD835", "#E53935", "#8E24AA"];
    return colors[index % colors.length];
}