// Function to load content dynamically
function loadContent(page) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", page, true);
    xhr.onreadystatechange = function () {
        console.log("ReadyState:", xhr.readyState, "Status:", xhr.status);
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                // Load the content into the #content section
                document.getElementById("content").innerHTML = xhr.responseText;

                // Dynamically load the About.css file if the page is About.html
                if (page === "About.html") {
                    // Check if the About.css link already exists
                    var existingLink = document.querySelector("link[href='css/About.css']");
                    if (!existingLink) {
                        var link = document.createElement("link");
                        link.rel = "stylesheet";
                        link.type = "text/css";
                        link.href = "css/About.css";
                        document.head.appendChild(link);
                    }
                } else {
                    // Remove the About.css file if another page is loaded
                    var existingLink = document.querySelector("link[href='css/About.css']");
                    if (existingLink) {
                        existingLink.remove();
                    }
                }

                // Update the browser's URL without reloading the page
                history.pushState({ page: page }, "", page);
            } else {
                console.error("Error loading " + page + " (Status: " + xhr.status + ")");
            }
        }
    };
    xhr.send();
}

// Handle back/forward navigation
window.addEventListener("popstate", function (event) {
    if (event.state && event.state.page) {
        loadContent(event.state.page);
    } else {
        loadContent("Main.html"); // Load the default page
    }
});

// Load the correct content based on the current URL
function initializePage() {
    const path = window.location.pathname.split("/").pop() || "Main.html";
    loadContent(path);
}

// Initialize the page when it loads
window.onload = initializePage;