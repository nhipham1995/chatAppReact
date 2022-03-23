import MessageForm from './MessageForm';
import MyMessage from './MyMessage';
import TheirMessage from './TheirMessage';

const ChatFeed = (props)=>{
    const {chats, activeChat, userName, messages} = props;
    const chat = chats && chats[activeChat];

    const renderReadReceipts = (msg, isMyMsg)=>{
        chat.people.map((person, index)=>{
            person.last_read === msg.id && 
            (<div key={`read_${index}`}
                className='send-receipt'
                style={{ float: isMyMsg ? 'right' : 'left',
                         backgroundImage: person.person.avatar && `url(${person?.person?.avatar})`
                    }}>
            </div>)  
        })
    }

    const renderMessages = ()=>{
        const keys = Object.keys(messages);
        return keys.map((key, index) =>{
            const message = messages[key];
            const lastMessageKey = index===0 ? null : keys[index-1];
            
            if(message){
                const isMyMessage = userName === message.sender.username;
                return (
                    <div key={`msg_${index}`}>
                        <div className="message-block">
                            {isMyMessage ? <MyMessage message={message}/> : <TheirMessage message={message} lastMessage={messages[lastMessageKey]}/>}
                            <div className="read-receipts"
                                style={{marginRight: isMyMessage ? '18px': '0px',
                                        marginLeft: isMyMessage ? '0px' : '68px'
                                }}>
                                    {renderReadReceipts(message, isMyMessage)}
                            </div>
                        </div>
                    </div>
                )
            }
        })
    }
    if(!chat) return <div/>
    return (
        <div className='chat-feed'>
            <div className='chat-title-container'>
                <div className='chat-title'>
                    {chat?.title}
                </div>
                <div className='chat-subtitle'>
                    {chat?.people.map((person, i)=>{
                        if(i === chat.people.length-1){
                            return `${person.person.username}` 
                        }
                        return (`${person.person.username}` + ', ')
                    })}
                </div>
                {renderMessages()}
                <div style={{ height: '60px' }} />
                <div className='message-form-container'>
                    <MessageForm {...props} chatId={activeChat}/> 
                </div>
            </div>
        </div>)
}
export default ChatFeed;