// // components/Chatbox.js
// import { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import { ScrollArea } from '@/components/ui/scroll-area';
// import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
// import { cn } from '@/lib/utils';
// import ReactMarkdown from 'react-markdown';

// import { GoogleGenerativeAI } from "@google/generative-ai";

// // Ensure environment variable for API key
// const AI_API_KEY = process.env.NEXT_PUBLIC_AI_API_KEY; // Use environment variable

// export default function Chatbox() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [chatHistory, setChatHistory] = useState([
//     { type: 'bot', message: 'Hey, how can I assist you today?' }
//   ]);
//   const [userInput, setUserInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [geminiModel, setGeminiModel] = useState(null);

//   // Initialize Gemini API
//   useEffect(() => {
//     if (AI_API_KEY) {
//       const genAI = new GoogleGenerativeAI(AI_API_KEY);
//       const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
//       setGeminiModel(model);
//     }
//   }, [AI_API_KEY]);

//   const toggleChatbox = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleUserInput = (e) => {
//     setUserInput(e.target.value);
//   };

//   const sendMessage = async () => {
//     if (!geminiModel || userInput.trim() === '') return;

//     setIsLoading(true);

//     try {
//       const result = await geminiModel.generateContent(userInput);
//       const response = result.response; // Adjust based on the actual response structure
//       console.log(response);

//       setChatHistory([
//         ...chatHistory,
//         { type: 'user', message: userInput },
//         { type: 'bot', message: response.text().replace(/"([^"]*)"/g, '*"$1"*') },
//       ]);
//     } catch (error) {
//       console.error('Error sending message:', error.message);
//     } finally {
//       setUserInput('');
//       setIsLoading(false);
//     }
//   };

//   const handleEnterKey = (event) => {
//     if (event.key === 'Enter') {
//       event.preventDefault();
//       sendMessage();
//     }
//   };

//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = 'https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs';
//     script.type = 'module';
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   return (
//     <>
//       <div className={cn(
//         "fixed bottom-20 right-20 transition-transform",
//         isOpen ? "transform translate-y-0 opacity-100" : "transform translate-y-full opacity-0"
//       )}>
//         <div className="flex flex-col h-[500px] w-[400px] rounded-xl border bg-background shadow-lg transition-transform">
//           <div className="flex items-center justify-between p-2 bg-background">
//             <h2 className="text-lg font-semibold text-foreground">Chat</h2>
//             <Button 
//               variant="ghost" 
//               size="icon" 
//               className="text-muted-foreground hover:text-foreground"
//               onClick={toggleChatbox}
//             >
//               <XIcon className="w-4 h-4" />
//             </Button>
//           </div>
//           <ScrollArea className="flex-1 overflow-y-auto p-4">
//             <div className="flex flex-col gap-4">
//               {chatHistory.map((msg, index) => (
//                 <div key={index} className={`flex items-start gap-2 ${msg.type === 'user' ? 'justify-end' : ''}`}>
//                   {msg.type === 'bot' ? (
//                     <Avatar className="w-8 h-8 border">
//                       <AvatarImage src="https://res.cloudinary.com/dngvge2sb/image/upload/v1721889453/Screenshot_2024-07-25_120517_vsvonk.png" />
//                       <AvatarFallback>KG</AvatarFallback>
//                     </Avatar>
//                   ) : (
//                     <Avatar className="w-8 h-8 border">
//                       <AvatarImage src="https://res.cloudinary.com/dngvge2sb/image/upload/v1721906599/user.jpg" />
//                       <AvatarFallback>BOT</AvatarFallback>
//                     </Avatar>
//                   )}
//                   <div className={`grid gap-1 p-2 rounded-lg ${msg.type === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
//                     <div className={`font-medium text-foreground ${msg.type === 'user' ? 'text-blue-600' : ''}`}>
//                       {msg.type === 'user' ? 'You' : 'HealR.ai'}
//                     </div>
//                     <div className="text-sm text-muted-foreground">
//                       <ReactMarkdown>{msg.message}</ReactMarkdown>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               {isLoading && <div className="text-muted-foreground">...Typing</div>}
//             </div>
//           </ScrollArea>
//           <div className="p-4 bg-background">
//             <div className="flex items-center gap-2 relative">
//               <textarea 
//                 value={userInput}
//                 onChange={handleUserInput}
//                 onKeyDown={handleEnterKey}
//                 className="border-input px-3 py-2  text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-full border rounded-full flex items-center h-9 resize-none overflow-hidden bg-background pr-10"
//                 placeholder="Type your message here.."
//               ></textarea>
//               <Button onClick={sendMessage} disabled={isLoading}>Send</Button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="fixed bottom-4 right-4">
//         <Button 
//           variant="ghost" 
//           size="icon" 
//           className="transparent hover:text-foreground"
//           onClick={toggleChatbox}
//           style={{ width: '100px', height: '100px' }}
//         >
//           <dotlottie-player 
//             src="https://lottie.host/02bd7a2c-e5cc-4978-9a24-b606f668cfe6/Pfm9RRaccV.json" 
//             background="transparent" 
//             speed="1" 
//             style={{ width: "100px", height: "100px" }} 
//             loop 
//             autoplay
//           ></dotlottie-player>
//         </Button>
//       </div>
//     </>
//   );
// }

// function XIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M18 6 6 18" />
//       <path d="m6 6 12 12" />
//     </svg>
//   );
// }



// **********************************************************************************************************************************************************************


// import { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import { ScrollArea } from '@/components/ui/scroll-area';
// import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
// import { cn } from '@/lib/utils';
// import ReactMarkdown from 'react-markdown';
// import { useStateContext } from '../_context';
// import { GoogleGenerativeAI } from "@google/generative-ai";

// export default function Chatbox() {
//   const { currentUser, fetchChatHistory, saveChatMessage } = useStateContext();
//   const [isOpen, setIsOpen] = useState(false);
//   const [chatHistory, setChatHistory] = useState([]);
//   const [userInput, setUserInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [geminiModel, setGeminiModel] = useState(null);

//   const AI_API_KEY = process.env.NEXT_PUBLIC_AI_API_KEY; // Use environment variable

//   // Initialize Gemini API
//   useEffect(() => {
//     if (AI_API_KEY) {
//       const genAI = new GoogleGenerativeAI(AI_API_KEY);
//       const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
//       setGeminiModel(model);
//     }
//   }, [AI_API_KEY]);

//   const toggleChatbox = async () => {
//     setIsOpen(!isOpen);
//     if (!isOpen && currentUser) {
//       const history = await fetchChatHistory(currentUser.id);
//       setChatHistory(history);
//     }
//   };

//   const handleUserInput = (e) => {
//     setUserInput(e.target.value);
//   };

//   const sendMessage = async () => {
//     if (!geminiModel || userInput.trim() === '') return;

//     setIsLoading(true);

//     try {
//       const result = await geminiModel.generateContent(userInput);
//       const response = result.response; // Adjust based on the actual response structure

//       // Update chat history in the state
//       const newHistory = [
//         ...chatHistory,
//         { type: 'user', message: userInput },
//         { type: 'bot', message: response.text().replace(/"([^"]*)"/g, '*"$1"*') },
//       ];
//       setChatHistory(newHistory);

//       console.log("Current User:", currentUser);

//       // Save messages to the database
//       if (currentUser) {
//         await saveChatMessage(currentUser.id, 'user', userInput);
//         await saveChatMessage(currentUser.id, 'bot', response.text().replace(/"([^"]*)"/g, '*"$1"*'));
//       } else {
//         console.error('Current user is null');
//       }
//     } catch (error) {
//       console.error('Error sending message:', error.message);
//     } finally {
//       setUserInput('');
//       setIsLoading(false);
//     }
//   };

//   const handleEnterKey = (event) => {
//     if (event.key === 'Enter') {
//       event.preventDefault();
//       sendMessage();
//     }
//   };

//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = 'https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs';
//     script.type = 'module';
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   return (
//     <>
//       <div className={cn(
//         "fixed bottom-20 right-20 transition-transform",
//         isOpen ? "transform translate-y-0 opacity-100" : "transform translate-y-full opacity-0"
//       )}>
//         <div className="flex flex-col h-[500px] w-[400px] rounded-xl border bg-background shadow-lg transition-transform">
//           <div className="flex items-center justify-between p-2 bg-background">
//             <h2 className="text-lg font-semibold text-foreground">Chat</h2>
//             <Button 
//               variant="ghost" 
//               size="icon" 
//               className="text-muted-foreground hover:text-foreground"
//               onClick={toggleChatbox}
//             >
//               <XIcon className="w-4 h-4" />
//             </Button>
//           </div>
//           <ScrollArea className="flex-1 overflow-y-auto p-4">
//             <div className="flex flex-col gap-4">
//               {chatHistory.map((msg, index) => (
//                 <div key={index} className={`flex items-start gap-2 ${msg.type === 'user' ? 'justify-end' : ''}`}>
//                   {msg.type === 'bot' ? (
//                     <Avatar className="w-8 h-8 border">
//                       <AvatarImage src="https://res.cloudinary.com/dngvge2sb/image/upload/v1721889453/Screenshot_2024-07-25_120517_vsvonk.png" />
//                       <AvatarFallback>KG</AvatarFallback>
//                     </Avatar>
//                   ) : (
//                     <Avatar className="w-8 h-8 border">
//                       <AvatarImage src="https://res.cloudinary.com/dngvge2sb/image/upload/v1721906599/user.jpg" />
//                       <AvatarFallback>BOT</AvatarFallback>
//                     </Avatar>
//                   )}
//                   <div className={`grid gap-1 p-2 rounded-lg ${msg.type === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
//                     <div className={`font-medium text-foreground ${msg.type === 'user' ? 'text-blue-600' : ''}`}>
//                       {msg.type === 'user' ? 'You' : 'HealR.ai'}
//                     </div>
//                     <div className="text-sm text-muted-foreground">
//                       <ReactMarkdown>{msg.message}</ReactMarkdown>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               {isLoading && <div className="text-muted-foreground">...Typing</div>}
//             </div>
//           </ScrollArea>
//           <div className="p-4 bg-background">
//             <textarea
//               rows="3"
//               value={userInput}
//               onChange={handleUserInput}
//               onKeyDown={handleEnterKey}
//               placeholder="Type your message..."
//               className="w-full p-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             <Button 
//               variant="primary" 
//               size="sm" 
//               className="mt-2 w-full" 
//               onClick={sendMessage} 
//               disabled={isLoading}
//             >
//               Send
//             </Button>
//           </div>
//         </div>
//       </div>
//       <Button 
//         variant="primary" 
//         size="icon" 
//         className="fixed bottom-6 right-6"
//         onClick={toggleChatbox}
//       >
//         {/* <ChatBubbleIcon className="w-6 h-6" /> */}
//       </Button>
//     </>
//   );
// }



// function XIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M18 6 6 18" />
//       <path d="m6 6 12 12" />
//     </svg>
//   );
// }

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import { useStateContext } from '../_context';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { generatePrompt } from '../_utils';

export default function Chatbox() {
  const { currentUser, fetchChatHistory, saveChatMessage } = useStateContext();
  const [isOpen, setIsOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [geminiModel, setGeminiModel] = useState(null);

  const AI_API_KEY = process.env.NEXT_PUBLIC_AI_API_KEY; // Use environment variable

  // Initialize Gemini API
  useEffect(() => {
    if (AI_API_KEY) {
      const genAI = new GoogleGenerativeAI(AI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      setGeminiModel(model);
    }
  }, [AI_API_KEY]);

  const toggleChatbox = async () => {
    setIsOpen(!isOpen);
    if (!isOpen && currentUser) {
      const history = await fetchChatHistory(currentUser.id);
      setChatHistory(history);
    }
  };

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const sendMessage = async () => {
    if (!geminiModel || userInput.trim() === '') return;

    setIsLoading(true);

    try {
      const result = await geminiModel.generateContent(userInput);
      const response = result.response; // Adjust based on the actual response structure

      // Update chat history in the state
      const newHistory = [
        ...chatHistory,
        { messageType: 'user', messageContent: userInput },
        { messageType: 'bot', messageContent: response.text().replace(/"([^"]*)"/g, '*"$1"*') },
      ];
      setChatHistory(newHistory);

      console.log("Current User:", currentUser);

      // Save messages to the database
      if (currentUser) {
        await saveChatMessage(currentUser.id, 'user', userInput);
        await saveChatMessage(currentUser.id, 'bot', response.text().replace(/"([^"]*)"/g, '*"$1"*'));
      } else {
        console.error('Current user is null');
      }
    } catch (error) {
      console.error('Error sending message:', error.message);
    } finally {
      setUserInput('');
      setIsLoading(false);
    }
  };

  const handleEnterKey = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs';
    script.type = 'module';
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <div className={cn(
        "fixed bottom-20 right-20 transition-transform",
        isOpen ? "transform translate-y-0 opacity-100" : "transform translate-y-full opacity-0"
      )}>
        <div className="flex flex-col h-[500px] w-[400px] rounded-xl border bg-background shadow-lg transition-transform">
          <div className="flex items-center justify-between p-2 bg-background">
            <h2 className="text-lg font-semibold text-foreground">Chat</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground hover:text-foreground"
              onClick={toggleChatbox}
            >
              <XIcon className="w-4 h-4" />
            </Button>
          </div>
          <ScrollArea className="flex-1 overflow-y-auto p-4">
            <div className="flex flex-col gap-4">
              {chatHistory.map((msg, index) => (
                <div key={index} className={`flex items-start gap-2 ${msg.messageType === 'user' ? 'justify-end' : ''}`}>
                  {msg.messageType === 'bot' ? (
                    <Avatar className="w-8 h-8 border">
                      <AvatarImage src="https://res.cloudinary.com/dngvge2sb/image/upload/v1721889453/Screenshot_2024-07-25_120517_vsvonk.png" />
                      <AvatarFallback>KG</AvatarFallback>
                    </Avatar>
                  ) : (
                    <Avatar className="w-8 h-8 border">
                      <AvatarImage src="https://res.cloudinary.com/dngvge2sb/image/upload/v1721906599/user.jpg" />
                      <AvatarFallback>BOT</AvatarFallback>
                    </Avatar>
                  )}
                  <div className={`grid gap-1 p-2 rounded-lg ${msg.messageType === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                    <div className={`font-medium text-foreground ${msg.messageType === 'user' ? 'text-blue-600' : ''}`}>
                      {msg.messageType === 'user' ? 'You' : 'HealR.ai'}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <ReactMarkdown>{msg.messageContent}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && <div className="text-muted-foreground">...Typing</div>}
            </div>
          </ScrollArea>
          <div className="p-4 bg-background">
            <div className='flex items-center gap-2 relative'>
            <textarea
              rows="3"
              value={userInput}
              onChange={handleUserInput}
              onKeyDown={handleEnterKey}
              placeholder="Type your message..."
              className="border-input px-3 py-2  text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-full border rounded-full flex items-center h-10 resize-none overflow-hidden bg-background pr-10"
            />
            <Button onClick={sendMessage} disabled={isLoading}>Send</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-4 right-4">
      <Button 
           variant="ghost" 
           size="icon" 
           className="transparent hover:text-foreground"
           onClick={toggleChatbox}
           style={{ width: '100px', height: '100px' }}
         >
           <dotlottie-player 
             src="https://lottie.host/02bd7a2c-e5cc-4978-9a24-b606f668cfe6/Pfm9RRaccV.json" 
             background="transparent" 
             speed="1" 
             style={{ width: "100px", height: "100px" }} 
             loop 
             autoplay
           ></dotlottie-player>
         </Button>
       </div>
    </>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
