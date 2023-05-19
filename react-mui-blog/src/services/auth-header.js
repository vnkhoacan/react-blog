
export default function authHeader() {
    const access_token = JSON.parse(localStorage.getItem("access_token"));

    if (access_token) {
        // For Spring Boot back-end
        return { Authorization: "Bearer " + access_token };

        // for Node.js Express back-end
        // return { "x-access-token": user.accessToken };
    } else {
        return {};
    }
}