import {ChatEngine} from 'react-chat-engine';
import './App.css';
import ChatFeed from './components/ChatFeed';
import LoginForm from './components/LoginForm';

const App =()=> {
  if(!localStorage.getItem('username')) {return <LoginForm/>};
  return (
    <ChatEngine
      height='100vh'
      projectID='8540e6c1-76d5-4c3a-b6ac-8e9d11601f0d'
      userName={localStorage.getItem('username')}
      userSecret={localStorage.getItem('password')}  
      renderChatFeed= {(chatAppProps)=><ChatFeed {...chatAppProps}/>}
    />
  );
}

export default App;
