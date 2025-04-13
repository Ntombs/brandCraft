import { useState } from "react";
import MainLayout from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Send, MessageSquare, Search } from "lucide-react";

export default function Messages() {
  const { user } = useAuth();
  const [messageText, setMessageText] = useState("");

  // Mock data for demonstration - would come from API in real implementation
  const conversations = [
    {
      id: 1,
      title: "Logo Design Project",
      lastMessage: "Thanks for the feedback, we'll incorporate those changes.",
      timestamp: "10:45 AM",
      unread: true,
    },
    {
      id: 2,
      title: "Website Redesign",
      lastMessage: "I've uploaded the latest mockups for your review.",
      timestamp: "Yesterday",
      unread: true,
    },
    {
      id: 3,
      title: "Brand Guidelines",
      lastMessage: "The final brand guidelines document is ready for download.",
      timestamp: "Monday",
      unread: true,
    },
  ];

  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);

  const messages = [
    {
      id: 1,
      sender: "admin",
      senderName: "Design Team",
      content: "Hello! We've started work on your logo concepts. Would you like to schedule a brief call to discuss initial ideas?",
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      sender: user?.id,
      senderName: `${user?.firstName} ${user?.lastName}`,
      content: "That would be great. I'm available tomorrow afternoon if that works for you.",
      timestamp: "10:35 AM",
    },
    {
      id: 3,
      sender: "admin",
      senderName: "Design Team",
      content: "Perfect! Let's do 2pm. I'll send a calendar invite. In the meantime, do you have any specific references or examples you'd like us to consider?",
      timestamp: "10:40 AM",
    },
    {
      id: 4,
      sender: user?.id,
      senderName: `${user?.firstName} ${user?.lastName}`,
      content: "Yes, I'll email over some examples that capture the feel I'm going for. Looking forward to the call!",
      timestamp: "10:45 AM",
    },
  ];

  const handleSend = () => {
    if (!messageText.trim()) return;
    // In a real app, this would send to the API
    setMessageText("");
  };

  return (
    <MainLayout>
      <div className="h-full flex flex-col">
        <div className="border-b border-gray-200 px-4 py-4">
          <h1 className="font-playfair text-2xl font-bold">Messages</h1>
          <p className="text-gray-600">Communicate with your design team</p>
        </div>
        
        <div className="flex flex-1 overflow-hidden">
          {/* Conversation List */}
          <div className="w-80 border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Search messages" 
                  className="pl-9"
                />
              </div>
            </div>
            <div className="overflow-y-auto flex-1">
              {conversations.map((conversation) => (
                <div 
                  key={conversation.id}
                  className={`p-4 cursor-pointer hover:bg-gray-50 border-b border-gray-100 ${
                    selectedConversation.id === conversation.id ? 'bg-gray-50' : ''
                  }`}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium">{conversation.title}</h3>
                    <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                  {conversation.unread && (
                    <div className="mt-1">
                      <span className="bg-black text-white text-xs px-1.5 py-0.5 rounded-full">New</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Conversation */}
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-medium">{selectedConversation.title}</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id}
                  className={`flex ${message.sender === user?.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender === user?.id 
                        ? 'bg-black text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-sm">{message.senderName}</span>
                      <span className="text-xs opacity-75">{message.timestamp}</span>
                    </div>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <Input 
                  placeholder="Type your message..." 
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  className="flex-1"
                />
                <Button 
                  className="bg-black text-white hover:bg-gray-800"
                  onClick={handleSend}
                  disabled={!messageText.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
