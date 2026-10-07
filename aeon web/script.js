// Yapılandırma: Kendi sunucu IP/alan adınızı buraya girin
const SERVER_ADDRESS = "play.aeonmc.net";

const ipBox = document.getElementById("copy-btn-box");
const toast = document.getElementById("toast");
const playerCountElem = document.getElementById("player-count");
const statusDot = document.getElementById("status-indicator");

// Panoya Kopyalama Fonksiyonu
function copyServerIP() {
    navigator.clipboard.writeText(SERVER_ADDRESS).then(() => {
        toast.classList.add("show");
        setTimeout(() => {
            toast.classList.remove("show");
        }, 2500);
    }).catch(err => {
        console.error("Kopyalama hatası:", err);
    });
}

if (ipBox) {
    ipBox.addEventListener("click", copyServerIP);
}

// mcsrvstat.us API üzerinden sunucu durumu kontrolü
async function updateServerStatus() {
    try {
        const response = await fetch(`https://api.mcsrvstat.us/3/${SERVER_ADDRESS}`);
        const data = await response.json();

        if (data.online) {
            playerCountElem.textContent = `${data.players.online} oyuncu aktif`;
            statusDot.classList.remove("offline");
        } else {
            playerCountElem.textContent = "Sunucu çevrimdışı";
            statusDot.classList.add("offline");
        }
    } catch (error) {
        playerCountElem.textContent = "Aktif oyuncular";
        console.error("Sunucu durumu alınamadı:", error);
    }
}

// Sayfa yüklendiğinde durumu kontrol et
document.addEventListener("DOMContentLoaded", updateServerStatus);