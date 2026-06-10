let events = [
    {
        name: "Tech Conference",
        date: "2026-07-15",
        description: "Latest technology trends."
    },
    {
        name: "Web Development Workshop",
        date: "2026-06-20",
        description: "Learn HTML, CSS and JavaScript."
    },
    {
        name: "Past Seminar",
        date: "2025-01-10",
        description: "An old event."
    }
];

const eventList = document.getElementById("eventList");
const form = document.getElementById("eventForm");
const warning = document.getElementById("warning");
const searchInput = document.getElementById("searchInput");

function displayEvents(filteredEvents = events) {

    eventList.innerHTML = "";

    filteredEvents.forEach((event, index) => {

        const card = document.createElement("div");
        card.classList.add("event-card");

        const today = new Date();
        const eventDate = new Date(event.date);

        if(eventDate < today){
            card.classList.add("past-event");
        }
        else{
            card.classList.add("upcoming-event");
        }

        card.innerHTML = `
            <h3>${event.name}</h3>
            <p><strong>Date:</strong> ${event.date}</p>
            <p>${event.description}</p>
            <button class="delete-btn"
            onclick="deleteEvent(${index})">
            Delete
            </button>
        `;

        eventList.appendChild(card);

    });

}

function deleteEvent(index){

    events.splice(index,1);
    displayEvents();

}

form.addEventListener("submit", function(e){

    e.preventDefault();

    const name =
    document.getElementById("eventName").value.trim();

    const date =
    document.getElementById("eventDate").value;

    const description =
    document.getElementById("eventDescription").value.trim();

    if(name === "" || date === "" || description === ""){

        warning.textContent =
        "All fields are required!";

        return;
    }

    warning.textContent = "";

    events.push({
        name,
        date,
        description
    });

    events.sort((a,b)=>
        new Date(a.date) - new Date(b.date)
    );

    displayEvents();

    form.reset();

});

searchInput.addEventListener("keyup", function(){

    const searchText =
    searchInput.value.toLowerCase();

    const filteredEvents = events.filter(event =>
        event.name.toLowerCase().includes(searchText) ||
        event.date.includes(searchText)
    );

    displayEvents(filteredEvents);

});

events.sort((a,b)=>
    new Date(a.date) - new Date(b.date)
);

displayEvents();