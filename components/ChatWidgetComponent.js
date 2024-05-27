// components/ChatWidgetComponent.js
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import { useEffect } from 'react';
import styles from '/styles/ChatWidget.module.css';

function ChatWidgetComponent() {
    useEffect(() => {
        addResponseMessage('Welcome to our car parts store! How can I help you today?');
    }, []);

    const handleNewUserMessage = async (newMessage) => {
        console.log(`New message incoming! ${newMessage}`);
        // Send message to backend and get the response
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: newMessage })
        });
        const data = await response.json();
        addResponseMessage(data.reply);
    };

    return (
        <div className={styles.chatWidgetContainer}>
            <Widget
                handleNewUserMessage={handleNewUserMessage}
                title="Chat with us"
                subtitle="Ask us anything about our car parts"
            />
        </div>
    );
}

export default ChatWidgetComponent;
