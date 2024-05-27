// components/ChatWidget.js
import dynamic from 'next/dynamic';

const ChatWidget = dynamic(() => import('./ChatWidgetComponent'), { ssr: false });

export default ChatWidget;
