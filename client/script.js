const API_URL = "http://127.0.0.1:5000/events";

// Retrieve events from Flask
async function fetchEvents() {
  try {
  // Send a GET request to Flask
  const res = await fetch(API_URL);

  // Check whether the request succeeded
  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  // Convert the JSON response into JavaScript data
  const events = await res.json();

  // Display the events in the browser console
  console.log("Events from Flask:", events);

  } catch (error) {
    console.log("Error fetching events:", error);
  }
}

// Call the function when the page loads
fetchEvents();
