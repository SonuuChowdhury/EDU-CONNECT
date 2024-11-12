export default async function HitServer() {
    setInterval(async () => {
        try {
            const response = await fetch('https://institute-site-az-bug-busters.onrender.com');
            if (response.ok) {
                console.log("Server is Live!!");
            } else {
                console.log("Server responded, but it's not live (Status: " + response.status + ")");
            }
        } catch (error) {
            console.log("Server Is Not Live!!", error);
        }
    }, 120000);
}
