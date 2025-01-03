document.addEventListener('DOMContentLoaded', () => {
    const userId = "879145354573000714"; // Replace with your hardcoded user ID
    const apiUrl = `https://discord-lookup-api-alpha.vercel.app/v1/user/${userId}`;

    // Elements
    const profilePicture = document.getElementById('profile-picture');
    const avatarFrame = document.getElementById('avatar-frame');

    // Fetch user data from the API
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("API Response:", data); // Debug: log the response

            // Set profile picture
            const avatarUrl = data.avatar ? data.avatar.link : './assets/pfp/default.jpg';
            profilePicture.src = avatarUrl;

            // Set avatar frame if available
            if (data.avatar_decoration && data.avatar_decoration.asset) {
                const asset = data.avatar_decoration.asset;
                const frameUrl = `https://cdn.discordapp.com/avatar-decoration-presets/${asset}.png`;
             // console.log("Avatar Frame URL:", frameUrl); // Debug: log frame URL
                avatarFrame.src = frameUrl;
                avatarFrame.style.display = 'block'; // Show the avatar frame
            } else {
                console.warn("No avatar frame asset found.");
            }

        })
        .catch(error => {
            console.error("Error fetching user data:", error);
        });
});
