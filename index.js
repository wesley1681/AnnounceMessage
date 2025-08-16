// 保持這些 import 語句不變
import { getContext } from "../../../extensions.js";
import { eventSource, event_types } from "../../../../script.js";

// 定義處理訊息的函式
function handleIncomingMessage(message) {
    // 參數 'message' 通常就是新收到的訊息物件，
    // 它應該會包含 'name' 和 'mes' (訊息內容) 等屬性。
    // 我們可以直接使用這個物件，而不是去整個 chat 歷史裡找。

    // 首先，檢查收到的訊息是否有效且有名字
    if (!message || !message.name) {
        return; // 如果訊息格式不對，就直接忽略
    }

    // 檢查瀏覽器是否支援語音合成
    if ('speechSynthesis' in window) {
        // 建立一個語音合成的實例
        // 我們可以讓它念出角色的名字和說了什麼
        const utterance = new SpeechSynthesisUtterance(`${message.name} said something`);

        // 播放語音
        window.speechSynthesis.speak(utterance);
    } else {
        // 如果不支援，在控制台印出錯誤
        console.error("Speech synthesis is not supported in this browser.");
    }
}

// 註冊事件監聽器，當有新訊息進來時，就呼叫 handleIncomingMessage 函式
eventSource.on(event_types.MESSAGE_RECEIVED, handleIncomingMessage);

// (可選) 您可以在擴展載入時印出一個訊息，方便除錯
console.log("AnnounceMessage extension loaded successfully.");