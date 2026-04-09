document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');

    // Simulate State
    let orderedItems = [];
    let state = 'INIT'; // INIT, ORDERING, CONFIRMING
    let hasAskedForPearl = false; // To simulate the out-of-stock scenario once

    // Initial greeting
    setTimeout(() => {
        addBotMessage("您好，我是天下茶屋的全能店員！請問今天想喝點什麼呢？");
    }, 500);

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = userInput.value.trim();
        if (!text) return;

        // Add user message
        addUserMessage(text);
        userInput.value = '';

        // Simulate typing delay
        showTypingIndicator();
        
        setTimeout(() => {
            hideTypingIndicator();
            processAgentResponse(text);
        }, 1200 + Math.random() * 800);
    });

    function addUserMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message user';
        msgDiv.textContent = text;
        chatMessages.appendChild(msgDiv);
        scrollToBottom();
    }

    function addBotMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message bot';
        msgDiv.textContent = text;
        chatMessages.appendChild(msgDiv);
        scrollToBottom();
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot typing-indicator';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = '<span></span><span></span><span></span>';
        chatMessages.appendChild(typingDiv);
        scrollToBottom();
    }

    function hideTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Agent Logic based on agent_Template.md
    function processAgentResponse(text) {
        // Simple mock NLP / Rule-based
        const lowerText = text.toLowerCase();
        
        if (lowerText.includes('結帳') || lowerText.includes('不用了') || lowerText.includes('就這樣') || lowerText.includes('沒有')) {
            addBotMessage("好的，為您結算。您的訂單已送至廚房為您準備，稍後為您叫號！謝謝您的光臨。");
            state = 'DONE';
            return;
        }

        if (state === 'DONE') {
            addBotMessage("您的訂單正在準備中囉！若需點新訂單，請告訴我「重新點餐」。");
            if (lowerText.includes('重新點餐')) {
                state = 'INIT';
                hasAskedForPearl = false;
                addBotMessage("好的，讓我們重新開始。請問這次想喝點什麼？");
            }
            return;
        }

        // Check for specific scenario: Pearl out of stock
        if (lowerText.includes('珍珠') && !hasAskedForPearl) {
            hasAskedForPearl = true;
            addBotMessage("非常抱歉，珍珠目前已經售罄了。請問您想換成其他配料，例如椰果或布丁嗎？");
            return;
        }

        // Generic matching for order
        let parsedDrink = "飲料";
        if (lowerText.includes('紅茶')) parsedDrink = "紅茶";
        else if (lowerText.includes('奶茶')) parsedDrink = "奶茶";
        else if (lowerText.includes('綠茶')) parsedDrink = "綠茶";
        else if (lowerText.includes('烏龍')) parsedDrink = "烏龍茶";
        
        let sugar = "正常糖";
        if (lowerText.includes('無糖')) sugar = "無糖";
        else if (lowerText.includes('微糖')) sugar = "微糖";
        else if (lowerText.includes('半糖')) sugar = "半糖";
        else if (lowerText.includes('少糖')) sugar = "少糖";

        let ice = "正常冰";
        if (lowerText.includes('去冰')) ice = "去冰";
        else if (lowerText.includes('微冰')) ice = "微冰";
        else if (lowerText.includes('少冰')) ice = "少冰";
        else if (lowerText.includes('溫') || lowerText.includes('熱')) ice = "溫熱";
        
        let topping = "";
        if (lowerText.includes('椰果')) topping = "加椰果";
        else if (lowerText.includes('布丁')) topping = "加布丁";
        else if (lowerText.includes('珍珠') && hasAskedForPearl) topping = "加珍珠(剛補貨)"; 

        let response = "";
        
        // If it looks like an order
        if (lowerText.includes('杯') || lowerText.includes('要') || lowerText.includes('喝')) {
            response = `好的，一杯${parsedDrink}${topping}，${sugar}${ice}。請問需要加購其他品項嗎？`;
        } else if (lowerText.includes('好') || lowerText.includes('可以') || lowerText.includes('換')) {
            response = `沒問題，已幫您調整。請問還需要其他飲料嗎？（若點餐完畢請說「結帳」）`;
        } else {
            response = "不好意思，我不太明白您的意思。您可以告訴我你想喝什麼（例如：我要一杯紅茶半糖去冰），或者詢問我們的推薦飲料。";
        }

        addBotMessage(response);
    }
});
