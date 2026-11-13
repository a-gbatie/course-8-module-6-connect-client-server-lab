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
  events.forEach(renderEvent);

  } catch (error) {
    console.log("Error fetching events:", error);
  }
}

// Call the function when the page loads
fetchEvents();

function renderEvent(event) {
  // Find the event in HTML
  const eventList = document.querySelector("#event-list");

  // Create a new list item
  const li = document.createElement("li");

  // Set text to the event title
  li.textContent = event.title;

  // Add new list item to webpage
  eventList.appendChild(li);
}

const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Grab title entered by the user
  const titleInput = document.querySelector("#title");
  const title = titleInput.value.trim();

  // Make sure user enter a title
  if (!title) {
    alert("Enter an event title.");
    return;
  }

  try {
    // Send new event to Flask
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title: title })
    });

    // Check if Flask accepted the request
    if (!res.ok) {
      throw new Error("Failed to create event");
    }

    // Read newly created event
    const newEvent = await res.json();

    // Display new event on page
    renderEvent(newEvent);

    // Clear input field
    titleInput.value = "";

  } catch (error) {
    console.error("Error creating event: ", error);
    alert("Could not create event. Please try again.");
  }
});