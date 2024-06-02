import { Widget, addResponseMessage, toggleMsgLoader } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import { useEffect } from 'react';
import chatFacade from "../facades/chatFacade";

function ChatWidgetComponent() {
    useEffect(() => {
        addResponseMessage('Welcome to V&V Automobile! How can I help you today?');
    }, []);

    const handleNewUserMessage = async (newMessage) => {
        console.log(`New message incoming! ${newMessage}`);
        toggleMsgLoader();

        try {
            const answer = await chatFacade.getChatResponse(newMessage)
            addResponseMessage(answer);
        } catch (error) {
            console.error("Error fetching chat response:", error);
            addResponseMessage("Sorry, there was an error processing your message. Please try again.");
        } finally {
            // Hide typing indicator
            toggleMsgLoader();
        }
    };

    return (
        <div className="chatWidgetContainer">
            <Widget
                handleNewUserMessage={handleNewUserMessage}
                title="Chat with us"
                subtitle="Ask us anything about our car parts"
            />
        </div>
    );
}

export default ChatWidgetComponent;
