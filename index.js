const eventsContainer = document.querySelector(".events-container");
const eventNotificationsBtn = document.getElementById("event-notifications-btn");
const chatBtn = document.getElementById("chat-btn");
const notifications = document.getElementById("notifications");
const chat = document.getElementById("chat");
const closeNotifications = document.getElementById("close-notifications");
const closeChat = document.getElementById("close-chat");
const form = document.querySelector("form")
const messageList = document.querySelector("#chat .event-list-body");
const notificationsList = document.querySelector("#notifications .event-list-body");
const messageInput = document.querySelector("input");

// Events Container
const eventNotifications = ["test event 1", "test event 2", "test event 3"];
const maxEvents = 20;

function addEventNotification(event) {
    notificationsList.innerHTML += `
        <div class="notification">
            <div class="time">${new Date().toISOString().replace("T", " ").slice(0, 16)}</div>

            <p class="content">Event: ${event}</p>
        </div>
    `;
}

function openEventsContainer(event) {
    eventsContainer.classList.add("open");
    event.classList.add("show");
}

function closeEventsContainer(event) {
    eventsContainer.classList.remove("open");
    event.classList.remove("show");
}

eventNotificationsBtn.addEventListener("click", () => openEventsContainer(notifications));
chatBtn.addEventListener("click", () => openEventsContainer(chat));

closeNotifications.addEventListener("click", () => closeEventsContainer(notifications));
closeChat.addEventListener("click", () => closeEventsContainer(chat));

eventNotifications.forEach(notif => addEventNotification(notif));

const intervalId = setInterval(() => {
    const newEvent = "test event " + (eventNotifications.length + 1);
    eventNotifications.push(newEvent);
    addEventNotification(newEvent);

    if(eventNotifications.length === maxEvents) clearInterval(intervalId)
}, 4000);

// Message
const users = ["user1", "user2", "user3", "user4", "user5", "user6", "user7"];
function newMessage(messageText) {
    const userIndex = Math.floor(Math.random() * users.length)
    messageList.innerHTML += `
        <div class="message">
            <div class="message-info">
                <span class="username">${users[userIndex]}</span>
                <span class="message-time">${new Date().toISOString().replace("T", " ").slice(0, 16)}</span>
            </div>

            <p class="message-text">${messageText}</p>
        </div>
    `;
}

form.addEventListener("submit", e => {
    e.preventDefault();

    if(!messageInput.value || messageInput.value === "") return;

    newMessage(messageInput.value);

    messageInput.value = "";
})