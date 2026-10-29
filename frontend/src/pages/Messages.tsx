import { useState } from 'react'
import './Messages.css'

export default function Messages() {
  const [search, setSearch] = useState('')

  // Conversations will be loaded from the messaging API in a later step.
  const conversations: {
    id: number
    name: string
    lastMessage: string
    time: string
    unread: number
  }[] = []

  const filteredConversations = conversations.filter((conversation) =>
    `${conversation.name} ${conversation.lastMessage}`
      .toLowerCase()
      .includes(search.trim().toLowerCase()),
  )

  return (
    <section className="messages-page">
      <header className="messages-header">
        <div>
          <p className="messages-eyebrow">STAY CONNECTED</p>
          <h1>Messages</h1>
          <p className="messages-subtitle">
            Communicate with people sharing resources in your community.
          </p>
        </div>
        <span className="messages-preview-badge">Messaging preview</span>
      </header>

      <div className="messages-workspace">
        <aside className="conversations-panel">
          <div className="conversations-heading">
            <div>
              <h2>Conversations</h2>
              <p>Your resource-sharing chats</p>
            </div>
            <span className="conversation-count">
              {conversations.length}
            </span>
          </div>

          <label className="messages-search">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search conversations..."
              aria-label="Search conversations"
            />
          </label>

          {filteredConversations.length === 0 ? (
            <div className="conversation-empty">
              <div className="messages-empty-icon" aria-hidden="true">
                <span>☰</span>
              </div>
              <h3>No conversations yet</h3>
              <p>
                Your chats will appear here when messaging is connected and
                conversations become available.
              </p>
            </div>
          ) : (
            <div className="conversation-list">
              {filteredConversations.map((conversation) => (
                <article className="conversation-item" key={conversation.id}>
                  <div className="conversation-avatar" aria-hidden="true">
                    {conversation.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="conversation-info">
                    <div className="conversation-topline">
                      <h3>{conversation.name}</h3>
                      <span>{conversation.time}</span>
                    </div>
                    <p>{conversation.lastMessage}</p>
                  </div>
                  {conversation.unread > 0 && (
                    <span className="unread-count">{conversation.unread}</span>
                  )}
                </article>
              ))}
            </div>
          )}
        </aside>

        <main className="chat-panel">
          <div className="chat-topbar">
            <div className="chat-topbar-icon" aria-hidden="true">
              <span>✉</span>
            </div>
            <div>
              <h2>Your messages</h2>
              <p>ReStash community communication</p>
            </div>
          </div>

          <div className="chat-empty">
            <div className="chat-empty-art" aria-hidden="true">
              <span>✉</span>
              <span className="chat-sparkle">✦</span>
            </div>
            <h2>Make room for a conversation</h2>
            <p>
              When messaging is enabled, you’ll be able to discuss resource
              availability, collection details, and booking questions here.
            </p>
            <span className="chat-coming-soon">
              <span className="chat-status-dot" />
              Messaging integration is the next step
            </span>
          </div>

          <form className="message-composer" onSubmit={(event) => event.preventDefault()}>
            <input
              type="text"
              placeholder="Select a conversation to send a message..."
              aria-label="Message"
              disabled
            />
            <button type="submit" disabled aria-label="Send message">
              <span>➤</span>
            </button>
          </form>
        </main>
      </div>
    </section>
  )
}