import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  MessageSquare, 
  Bot, 
  Check, 
  Sparkles, 
  FileText, 
  DollarSign, 
  PlusCircle, 
  User, 
  ArrowLeft,
  ShieldCheck,
  PackageCheck
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { RoboticComponent } from '../types';

export const ChatDrawer: React.FC = () => {
  const {
    isChatOpen,
    setIsChatOpen,
    isOwnerMode,
    systemConfig,
    chatSessions,
    activeSessionId,
    currentVisitorSession,
    activeOwnerSessionId,
    setActiveOwnerSessionId,
    sendVisitorMessage,
    sendOwnerMessage,
    components,
    markSessionReadByVisitor,
    markSessionReadByOwner
  } = useStore();

  const [inputMessage, setInputMessage] = useState('');
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [quoteAmount, setQuoteAmount] = useState('');
  const [quoteItem, setQuoteItem] = useState('');
  const [quoteNotes, setQuoteNotes] = useState('');
  const [showComponentPicker, setShowComponentPicker] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom();
      if (isOwnerMode && activeOwnerSessionId) {
        markSessionReadByOwner(activeOwnerSessionId);
      } else {
        markSessionReadByVisitor();
      }
    }
  }, [isChatOpen, chatSessions, isOwnerMode, activeOwnerSessionId]);

  if (!isChatOpen) return null;

  // Selected session for Owner
  const currentOwnerSession = chatSessions.find((s) => s.id === (activeOwnerSessionId || activeSessionId));

  // Active messages to display
  const activeMessages = isOwnerMode
    ? (currentOwnerSession?.messages || [])
    : (currentVisitorSession?.messages || []);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    if (isOwnerMode && currentOwnerSession) {
      sendOwnerMessage(currentOwnerSession.id, inputMessage.trim());
    } else {
      sendVisitorMessage(inputMessage.trim());
    }
    setInputMessage('');
  };

  const handleSendQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteAmount || !quoteItem || !currentOwnerSession) return;
    
    sendOwnerMessage(
      currentOwnerSession.id,
      `Official Quote Issued: ${quoteItem} at ${systemConfig.currencySymbol}${Number(quoteAmount).toFixed(2)}`,
      {
        productTitle: quoteItem,
        amount: Number(quoteAmount),
        notes: quoteNotes
      }
    );

    setShowQuoteForm(false);
    setQuoteAmount('');
    setQuoteItem('');
    setQuoteNotes('');
  };

  const handleRecommendComponent = (comp: RoboticComponent) => {
    if (isOwnerMode && currentOwnerSession) {
      sendOwnerMessage(
        currentOwnerSession.id,
        `I recommend using the ${comp.title} for your setup ($${comp.price.toFixed(2)}). It has tested compatibility.`,
        {
          productTitle: comp.title,
          amount: comp.price,
          notes: comp.shortDescription
        }
      );
    } else {
      sendVisitorMessage(`Could you give me more technical details on ${comp.title}?`, {
        id: comp.id,
        title: comp.title,
        price: comp.price,
        image: comp.image,
        category: comp.category
      });
    }
    setShowComponentPicker(false);
  };

  const quickPrompts = [
    'Is Arduino Uno R4 shield compatible?',
    'What cables do I need for Nano?',
    'Recommend a motor driver for 4WD kit',
    'Do you ship with pinout diagrams?'
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={() => setIsChatOpen(false)}></div>

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-lg bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isOwnerMode && activeOwnerSessionId && (
                <button
                  onClick={() => setActiveOwnerSessionId(null)}
                  className="lg:hidden p-1 text-slate-400 hover:text-white"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}

              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-bold">
                  {isOwnerMode ? 'OW' : 'MA'}
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900"></span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-white">
                    {isOwnerMode 
                      ? (currentOwnerSession ? currentOwnerSession.visitorName : 'Owner Live Hub')
                      : systemConfig.ownerName
                    }
                  </h3>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-cyan-400 font-mono">
                    {isOwnerMode ? 'Admin Mode' : 'Store Owner'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  {isOwnerMode 
                    ? 'Managing real-time maker inquiries' 
                    : `${systemConfig.ownerEmail} · ${systemConfig.ownerStatus === 'online' ? 'Typically responds instantly' : 'In Lab'}`}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsChatOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Owner Multi-Session Split or Chat Body */}
          {isOwnerMode && !activeOwnerSessionId ? (
            /* Owner Inbox: List of all Customer Inquiries */
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-2">
                Active Buyer Threads ({chatSessions.length})
              </div>
              {chatSessions.map((session) => (
                <div
                  key={session.id}
                  onClick={() => {
                    setActiveOwnerSessionId(session.id);
                    markSessionReadByOwner(session.id);
                  }}
                  className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex-1 min-w-0 pr-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white group-hover:text-amber-300 transition-colors">
                        {session.visitorName}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {new Date(session.lastTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 truncate mt-1">
                      {session.lastMessage}
                    </p>
                  </div>

                  {session.unreadByOwner > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950 tabular-nums">
                      {session.unreadByOwner}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            /* Active Message Thread */
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {/* Top Banner Notice */}
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>
                  {isOwnerMode 
                    ? `Replying as store owner: ${systemConfig.ownerName}` 
                    : `Direct channel to Mallick Akkah. Ask about wire compatibility, pinouts, or kit assembly.`}
                </span>
              </div>

              {/* Messages list */}
              {activeMessages.map((msg) => {
                const isMe = isOwnerMode ? msg.sender === 'owner' : msg.sender === 'visitor';
                const isOwner = msg.sender === 'owner';

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <span className="text-[10px] font-mono text-slate-500 mb-0.5 px-1">
                      {msg.senderName} · {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>

                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-sm ${
                        isMe
                          ? isOwnerMode
                            ? 'bg-amber-500 text-slate-950 rounded-br-none font-medium'
                            : 'bg-cyan-500 text-slate-950 rounded-br-none font-medium'
                          : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700/60'
                      }`}
                    >
                      {/* Attached Product preview if any */}
                      {msg.attachedProduct && (
                        <div className="mb-2 p-2 rounded-lg bg-slate-950/30 border border-slate-900/40 flex items-center gap-2.5">
                          {msg.attachedProduct.image ? (
                            <img
                              src={msg.attachedProduct.image}
                              alt={msg.attachedProduct.title}
                              className="w-9 h-9 rounded object-cover"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded bg-slate-900 flex items-center justify-center font-mono text-[9px] text-cyan-300">
                              HW
                            </div>
                          )}
                          <div className="min-w-0 text-left">
                            <div className="font-semibold truncate text-[11px]">
                              {msg.attachedProduct.title}
                            </div>
                            <div className="text-[10px] font-mono opacity-80 tabular-nums">
                              {systemConfig.currencySymbol}{msg.attachedProduct.price.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Official Quote Card if any */}
                      {msg.isQuote && msg.quoteDetails && (
                        <div className="mb-2 p-2.5 rounded-lg bg-slate-950/40 border border-amber-600/40 text-left space-y-1">
                          <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-300">
                            <DollarSign className="w-3.5 h-3.5" />
                            <span>Custom Robotics Hardware Quote</span>
                          </div>
                          <div className="text-xs font-semibold text-white">
                            {msg.quoteDetails.productTitle}
                          </div>
                          <div className="text-base font-bold font-mono text-emerald-400 tabular-nums">
                            {systemConfig.currencySymbol}{msg.quoteDetails.amount.toFixed(2)}
                          </div>
                          {msg.quoteDetails.notes && (
                            <div className="text-[10px] text-slate-300">
                              Note: {msg.quoteDetails.notes}
                            </div>
                          )}
                        </div>
                      )}

                      <div className="whitespace-pre-wrap">{msg.text}</div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Quick Prompts (Only for visitors when no custom input typed yet) */}
          {!isOwnerMode && !inputMessage && (
            <div className="px-4 py-2 border-t border-slate-800/60 bg-slate-950/40 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              <span className="text-[10px] text-slate-500 whitespace-nowrap">Suggested:</span>
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => sendVisitorMessage(prompt)}
                  className="px-2.5 py-1 text-[11px] rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/80 whitespace-nowrap transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Owner Quick Actions Toolbar */}
          {isOwnerMode && currentOwnerSession && (
            <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-950/60 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowQuoteForm(!showQuoteForm)}
                  className="px-2.5 py-1 rounded bg-amber-950/70 border border-amber-600/40 text-amber-300 hover:bg-amber-900 transition-colors flex items-center gap-1.5"
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Issue Custom Quote</span>
                </button>

                <button
                  onClick={() => setShowComponentPicker(!showComponentPicker)}
                  className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 transition-colors flex items-center gap-1.5"
                >
                  <PlusCircle className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Recommend Part</span>
                </button>
              </div>

              <button
                onClick={() => setActiveOwnerSessionId(null)}
                className="text-[11px] text-slate-400 hover:text-slate-200"
              >
                All Inquiries
              </button>
            </div>
          )}

          {/* Quote Form Drawer (Owner only) */}
          {showQuoteForm && isOwnerMode && (
            <form onSubmit={handleSendQuote} className="p-3 bg-slate-950 border-t border-amber-600/40 space-y-2">
              <div className="text-xs font-semibold text-amber-300">Generate Direct Pricing Quote</div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Component or Kit name"
                  value={quoteItem}
                  onChange={(e) => setQuoteItem(e.target.value)}
                  className="px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded text-slate-200"
                  required
                />
                <input
                  type="number"
                  step="0.01"
                  placeholder="Amount ($)"
                  value={quoteAmount}
                  onChange={(e) => setQuoteAmount(e.target.value)}
                  className="px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded text-slate-200 font-mono"
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Specification / shipping note"
                value={quoteNotes}
                onChange={(e) => setQuoteNotes(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded text-slate-200"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowQuoteForm(false)}
                  className="px-3 py-1 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 text-xs font-semibold rounded bg-amber-500 hover:bg-amber-400 text-slate-950"
                >
                  Send Quote into Chat
                </button>
              </div>
            </form>
          )}

          {/* Component Quick Picker */}
          {showComponentPicker && (
            <div className="p-3 bg-slate-950 border-t border-slate-800 max-h-48 overflow-y-auto space-y-1.5">
              <div className="text-xs font-mono text-slate-400">Select component to send:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {components.slice(0, 6).map((comp) => (
                  <button
                    key={comp.id}
                    onClick={() => handleRecommendComponent(comp)}
                    className="p-1.5 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 text-left flex items-center justify-between text-xs"
                  >
                    <span className="truncate pr-2 text-slate-300">{comp.title}</span>
                    <span className="font-mono text-cyan-400 shrink-0 tabular-nums">
                      ${comp.price.toFixed(2)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Message Input Bar */}
          <form onSubmit={handleSend} className="p-4 border-t border-slate-800 bg-slate-950 flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={isOwnerMode ? "Reply to visitor as Mallick Akkah..." : "Ask Mallick about components, wiring, or kits..."}
              className="flex-1 px-4 py-2.5 text-xs bg-slate-900 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className={`p-2.5 rounded-xl transition-colors ${
                isOwnerMode 
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950' 
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
              } disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
