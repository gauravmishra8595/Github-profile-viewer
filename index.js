let user = document.getElementById("userID");
let profile = document.getElementById("userProfile");

async function fetchUser(username) {
    try {
        let response = await fetch(`https://api.github.com/users/${username}`);
        let result = await response.json();

        if (result.message === "Not Found") {
            profile.innerHTML = `<h2>User Not Found ❌</h2>`;
            return;
        }

        displayUser(result);

    } catch (error) {
        profile.innerHTML = `<h2>Something went wrong ⚠️</h2>`;
    }
}

document.getElementById("btn").addEventListener("click", () => {
    let userId = user.value.trim();

    if (!userId) {
        profile.innerHTML = `<h2>Please enter a username ⚠️</h2>`;
        return;
    }

    profile.innerHTML = `<span class="loader"></span>`;
    fetchUser(userId);
});

// 🔥 Enter key support
user.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        document.getElementById("btn").click();
    }
});

function displayUser({
    avatar_url,
    name,
    bio,
    followers,
    following,
    public_repos,
    html_url
}) {

    profile.innerHTML = `               
        <div class="userInfo">
            <img src="${avatar_url}" class="userImg" alt="User Image">
            <div class="userDetail">
                <p class="userName">${name || "No Name"}</p>
                <p class="userBio">${bio || ""}</p>
            </div>
        </div>

        <div class="userFollow">
            <div class="Follower">
                <div class="repo">
                    <p>Followers</p>
                    <p>${followers}</p>
                </div>
                <div class="repo">
                    <p>Following</p>
                    <p>${following}</p>
                </div>
                <div class="repo">
                    <p>Repos</p>
                    <p>${public_repos}</p>
                </div>
            </div>

            <a href="${html_url}" target="_blank" class="VisitProfile">
                Visit Profile
            </a>
        </div>
    `;
}
