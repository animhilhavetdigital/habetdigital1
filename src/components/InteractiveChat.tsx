"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";

const CHAT_QUESTIONS = [
  { id: "montant", text: "Quel est le montant total de votre crédit en euros ?", type: "number" as const, placeholder: "Ex: 15000" },
  { id: "nb_crédits", text: "Combien de crédits conso litigieux avez-vous ?", type: "select" as const, options: ["1 crédit", "2 crédits", "3 crédits ou plus"], values: ["1", "2", "3"] },
  { id: "demarcheur", text: "Un intermédiaire ou démarcheur était-il présent lors de la vente ?", type: "boolean" as const },
  { id: "domicile", text: "Le contrat a-t-il été signé chez vous (à domicile) ?", type: "boolean" as const },
  { id: "retractation", text: "Ont-ils respecté le délai de rétractation ?", type: "boolean" as const },
  { id: "prelevements", text: "Les prélèvements ont-ils déjà commencé ?", type: "boolean" as const },
  { id: "relance", text: "Avez-vous déjà reçu des courriers de relance ?", type: "boolean" as const },
  { id: "mise_en_demeure", text: "Avez-vous reçu une mise en demeure ?", type: "boolean" as const },
  { id: "ficp", text: "Êtes-vous menacé(e) de fichage Banque de France (FICP) ou avez-vous déjà été fiché(e) ?", type: "boolean" as const },
  { id: "retard", text: "Êtes-vous en retard de paiement actuellement ?", type: "boolean" as const },
  { id: "solvabilite", text: "L'organisme a-t-il vérifié votre solvabilité réelle ?", type: "boolean" as const },
  { id: "revenus_charges", text: "A-t-il vérifié vos revenus et vos charges ?", type: "boolean" as const },
  { id: "info_claire", text: "Y a-t-il des absences d'information claire (coût total, taux, risques) ?", type: "boolean" as const },
  { id: "justificatifs", text: "A-t-il vérifié tous les éléments sans exception (justificatifs, situation pro, charges, relevés) ?", type: "boolean" as const },
  { id: "ficp_consulte", text: "L'organisme a-t-il consulté le FICP et vérifié vos crédits en cours ?", type: "boolean" as const },
  { id: "antecedents", text: "L'organisme avait-il connaissance de vos antécédents de fichage ou incidents bancaires ?", type: "boolean" as const },
];

interface InteractiveChatProps {
  onComplete: (data: Record<string, string>) => void;
  onClose: () => void;
}

export default function InteractiveChat({ onComplete, onClose }: InteractiveChatProps) {
  const [chatMessages, setChatMessages] = useState<{sender: "bot"|"user", text: string}[]>([
    { sender: "bot", text: "Bienvenue ! Je serai votre guide pour ce test. Si vous souhaitez m'entendre parler, veuillez activer l'audio." }
  ]);
  const [chatIndex, setChatIndex] = useState(-1);
  const [chatInputValue, setChatInputValue] = useState("");
  const [audioEnabled, setAudioEnabled] = useState<boolean | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({ "nb_crédits": "1" });
  const chatEndRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const numberInputRef = useRef<HTMLInputElement>(null);

  const speak = useCallback((text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "fr-FR";
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  const handleAudioChoice = useCallback((enable: boolean) => {
    setAudioEnabled(enable);
    setChatMessages(prev => [
      ...prev,
      { sender: "user", text: enable ? "Je veux écouter" : "Je préfère lire" }
    ]);
    
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        { sender: "bot", text: "Parfait. Commençons !" }
      ]);
      if (enable) speak("Parfait. Commençons ! " + CHAT_QUESTIONS[0].text);
      
      setTimeout(() => {
        setChatMessages(prev => [
          ...prev,
          { sender: "bot", text: CHAT_QUESTIONS[0].text }
        ]);
        setChatIndex(0);
      }, 1000);
    }, 600);
  }, [speak]);

  const handleChatAnswer = useCallback((val: string, displayVal: string) => {
    if (!val.trim() || chatIndex === -1) return;

    const q = CHAT_QUESTIONS[chatIndex];
    const newFormData = { ...formData, [q.id]: val };
    setFormData(newFormData);
    setChatInputValue("");
    
    setChatMessages(prev => [
      ...prev, 
      { sender: "user", text: displayVal }
    ]);

    const nextIndex = chatIndex + 1;
    if (nextIndex < CHAT_QUESTIONS.length) {
      setTimeout(() => {
        setChatMessages(prev => [
          ...prev,
          { sender: "bot", text: CHAT_QUESTIONS[nextIndex].text }
        ]);
        if (audioEnabled) speak(CHAT_QUESTIONS[nextIndex].text);
        setChatIndex(nextIndex);
      }, 600);
    } else {
      setTimeout(() => {
        if ("speechSynthesis" in window) {
          window.speechSynthesis.cancel();
        }
        onComplete(newFormData);
      }, 800);
    }
  }, [chatIndex, formData, audioEnabled, onComplete, speak]);

  const handleChatSubmitNumber = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInputValue) return;
    handleChatAnswer(chatInputValue, chatInputValue + " €");
  }, [chatInputValue, handleChatAnswer]);

  const currentType = chatIndex >= 0 ? CHAT_QUESTIONS[chatIndex]?.type : null;

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [chatMessages]);

  useEffect(() => {
    if (currentType === "number" && numberInputRef.current) {
      setTimeout(() => {
        numberInputRef.current?.focus({ preventScroll: true });
      }, 50);
    }
  }, [chatIndex, currentType]);

  return (
    <div className="w-full rounded-3xl bg-white border border-gray-100 shadow-xl overflow-hidden flex flex-col h-[520px] animate-in zoom-in-95 fade-in duration-300">
      {/* Header — centré & minimal */}
      <div className="flex-none px-6 py-5 bg-white border-b border-gray-50 flex items-center justify-center relative">
        <div className="text-center">
          <h3 className="font-semibold text-gray-900 text-base">Assistant DroitHabitat</h3>
          <div className="flex items-center justify-center gap-1.5 mt-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <p className="text-xs text-gray-400">En ligne</p>
          </div>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {audioEnabled !== null && (
            <button 
              onClick={() => { setAudioEnabled(!audioEnabled); if (audioEnabled && "speechSynthesis" in window) window.speechSynthesis.cancel(); }}
              className="text-gray-400 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-all"
              title={audioEnabled ? "Désactiver l'audio" : "Activer l'audio"}
            >
              {audioEnabled ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
              )}
            </button>
          )}
          <button onClick={() => {
            if ("speechSynthesis" in window) window.speechSynthesis.cancel();
            onClose();
          }} className="text-gray-400 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-all">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div ref={messagesRef} className="flex-1 overflow-y-auto bg-gray-50/40 p-5 space-y-3" style={{ scrollbarWidth: "thin" }}>
        {chatMessages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed ${
              msg.sender === "user" 
                ? "bg-gray-900 text-white rounded-2xl rounded-tr-sm font-medium" 
                : "bg-white text-gray-700 border border-gray-100 rounded-2xl rounded-tl-sm shadow-sm"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="flex-none bg-white p-4 space-y-3">
        
        {/* Audio choice */}
        {chatIndex === -1 && (
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => handleAudioChoice(true)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-gray-900 text-white font-semibold hover:bg-black transition-all text-sm flex items-center justify-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
              Écouter
            </button>
            <button
              onClick={() => handleAudioChoice(false)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 font-semibold hover:bg-gray-50 transition-all text-sm flex items-center justify-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Lire
            </button>
          </div>
        )}

        {/* Select buttons */}
        {currentType === "select" && (
          <div className="flex flex-wrap gap-2 justify-center">
            {CHAT_QUESTIONS[chatIndex].options?.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleChatAnswer(CHAT_QUESTIONS[chatIndex].values![i], opt)}
                className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-gray-700 font-medium hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all text-sm shadow-sm"
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {/* Boolean buttons */}
        {currentType === "boolean" && (
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => handleChatAnswer("oui", "Oui")}
              className="flex-1 px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 font-semibold hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all text-center text-sm shadow-sm"
            >
              Oui
            </button>
            <button
              onClick={() => handleChatAnswer("non", "Non")}
              className="flex-1 px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 font-semibold hover:border-red-500 hover:bg-red-50 hover:text-red-600 transition-all text-center text-sm shadow-sm"
            >
              Non
            </button>
          </div>
        )}

        {/* Main input bar — style capture */}
        {currentType === "number" && (
          <form onSubmit={handleChatSubmitNumber} className="bg-white rounded-2xl border border-gray-200 shadow-sm px-3 py-2 flex items-center gap-2">
            <button
              type="button"
              className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors shrink-0"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
            <input
              type="number"
              value={chatInputValue}
              onChange={(e) => setChatInputValue(e.target.value)}
              placeholder={CHAT_QUESTIONS[chatIndex].placeholder || "Votre réponse..."}
              className="flex-1 bg-transparent border-none outline-none text-sm text-gray-800 placeholder:text-gray-400"
              ref={numberInputRef}
            />
            <button
              type="submit"
              disabled={!chatInputValue}
              className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center text-white hover:bg-black transition-colors disabled:opacity-40 shrink-0"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
            </button>
          </form>
        )}

        {/* Loading / done */}
        {chatIndex >= 0 && !currentType && (
          <div className="flex gap-2 items-center justify-center py-3 text-gray-400">
            <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        )}
      </div>
    </div>
  );
}
