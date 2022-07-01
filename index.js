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
const unreadMessages = document.getElementById("unread-messages");
const leftIndicator = document.getElementById("left-indicator");
const rightIndicator = document.getElementById("right-indicator");
const usersContainer = document.getElementById("users-container");

let unreadMessagesCount = 0;
let totalUsersShowingOnScreen = +getComputedStyle(usersContainer.querySelector('.user')).getPropertyValue('--total-users-showing');

if(totalUsersShowingOnScreen === usersContainer.children.length) rightIndicator.classList.add("hidden");

window.addEventListener("resize", () => {
    const windowSize = window.innerWidth;
    if(windowSize <= 325) totalUsersShowingOnScreen = 1;
    else if(windowSize <= 500) totalUsersShowingOnScreen = 2;
    else if(windowSize <= 900) totalUsersShowingOnScreen = 3;
    else if(windowSize <= 1300) totalUsersShowingOnScreen = 5;
    else totalUsersShowingOnScreen = 7;

    if(rightIndicator.classList.contains("hidden"))
        if(totalUsersShowingOnScreen < usersContainer.children.length)
                rightIndicator.classList.remove("hidden")
    else
        if(totalUsersShowingOnScreen === usersContainer.children.length)
            rightIndicator.classList.add("hidden");
});

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
chatBtn.addEventListener("click", () => {
    openEventsContainer(chat);
    unreadMessagesCount = 0;
    unreadMessages.classList.add("hidden");
});

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
const users = ["Michailidis Michail", "Alexandros Mouratidis", "Omiros Malakis", "Kwnstantinos Sanidiwtis"];
const feed = [
    "test message 1",
    "test message 2",
    "test message 3",
    "test message 4",
    "test message 5",
    "test message 6",
    "test message 7",
    "test message 8",
    "test message 9",
    "test message 10",
    "test message 11",
    "test message 12",
    "test message 13"
];

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

    if(!eventsContainer.classList.contains("open")) {
        if(unreadMessagesCount === 0) unreadMessages.classList.remove("hidden");

        unreadMessagesCount++;
        unreadMessages.innerText = unreadMessagesCount >= 100 ? '99+' : unreadMessagesCount;
    }
}

let currentMessageToDisplay = 0;
let mockMessagesIntervalId = setInterval(() => {
    newMessage(feed[currentMessageToDisplay])
    currentMessageToDisplay++;

    if(currentMessageToDisplay >= feed.length) clearInterval(mockMessagesIntervalId);
}, 2000)

form.addEventListener("submit", e => {
    e.preventDefault();

    if(!messageInput.value || messageInput.value === "") return;

    newMessage(messageInput.value);

    messageInput.value = "";
})

// Carousel
let currentCarouselPosition = 0;

leftIndicator.addEventListener("click", () => {
    currentCarouselPosition--;

    if(currentCarouselPosition === 0) {
        leftIndicator.classList.add("hidden");
    }

    if(rightIndicator.classList.contains("hidden")) rightIndicator.classList.remove("hidden")

    moveCarousel();
});

rightIndicator.addEventListener("click", () => {
    currentCarouselPosition++;

    if(currentCarouselPosition === 2) {
        rightIndicator.classList.add("hidden");
    }

    if(leftIndicator.classList.contains("hidden")) leftIndicator.classList.remove("hidden")

    moveCarousel();
})

function moveCarousel() {
    usersContainer.style.transform = `translateX(calc(-${currentCarouselPosition}*100%))`;
}