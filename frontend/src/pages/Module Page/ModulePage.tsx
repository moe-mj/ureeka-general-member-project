import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import api from '../../services/api';
import './ModulePage.css';

interface Module {
    id: string;
    title: string;
    content: string;
    courseId: string;
    order: number;
    isCompleted?: boolean;
}

interface ChatMessage {
    role: 'user' | 'ai';
    content: string;
}

function ModulePage() {
    const { moduleId } = useParams<{ moduleId: string }>();
    const navigate = useNavigate();
    const [currentModule, setCurrentModule] = useState<Module | null>(null);
    const [allModules, setAllModules] = useState<Module[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [completing, setCompleting] = useState(false);

    const [showPopup, setShowPopup] = useState(false);
    const [selectedText, setSelectedText] = useState('');
    const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
    const contentRef = useRef<HTMLDivElement>(null);
    const popupRef = useRef<HTMLButtonElement>(null);

    const [showAIModal, setShowAIModal] = useState(false);
    const [userQuestion, setUserQuestion] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [loadingAI, setLoadingAI] = useState(false);

    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState('');
    const chatEnd = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!moduleId) {
                setError('Module ID tidak valid');
                setLoading(false);
                return;
            }
            try {
                const moduleRes = await api.get(`/api/learning/module/${moduleId}`);
                const current = moduleRes.data;

                const modulesRes = await api.get(`/api/learning/${current.courseId}/modules`);
                let modules = modulesRes.data;

                try {
                    const progressRes = await api.get(`/api/progress/course/${current.courseId}`);
                    const progressMap = new Map();

                    if (Array.isArray(progressRes.data)) {
                        progressRes.data.forEach((p: any) => {
                            progressMap.set(p.moduleId, p.isCompleted);
                        });
                    }
                    modules = modules.map((m: Module) => ({
                        ...m,
                        isCompleted: progressMap.get(m.id) || false,
                    }));
                    current.isCompleted = progressMap.get(current.id) || false;
                } catch (err) {
                    console.warn('Progress API belum tersedia, lanjutkan tanpa status completed');
                }
                setCurrentModule(current);
                setAllModules(modules);

            } catch (err) {
                console.error(err);
                setError('Gagal memuat modul.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [moduleId]);

    useEffect(() => {
        const handleSelection = () => {
            const selection = window.getSelection();
            if (!selection || selection.isCollapsed || !contentRef.current) {
                setShowPopup(false);
                return;
            }

            const text = selection.toString().trim();
            if (text.length === 0) {
                setShowPopup(false);
                return;
            }

            let container = selection.anchorNode;
            let insideContent = false;
            while (container) {
                if (container === contentRef.current) {
                    insideContent = true;
                    break;
                }
                container = container.parentElement;
            }
            if (!insideContent) {
                setShowPopup(false);
                return;
            }

            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();

            const x = rect.left + (rect.width / 2) + window.scrollX;
            const y = rect.top + window.scrollY;

            setSelectedText(text);
            setPopupPosition({ x, y });
            setShowPopup(true);
        };

        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setShowPopup(false);
            }
        };

        document.addEventListener('mouseup', handleSelection);
        document.addEventListener('mousedown', handleClickOutside);

        window.addEventListener('scroll', () => setShowPopup(false));

        return () => {
            document.removeEventListener('mouseup', handleSelection);
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', () => setShowPopup(false));
        };
    }, []);

    const handleAskAI = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowPopup(false);
        setUserQuestion(selectedText);
        setAiResponse('');

        const initialMessage = `Saya mau bertanya tentang bagian ini: ${selectedText}`;
        setMessages([{
            role: 'user', content: initialMessage
        }]);

        setShowAIModal(true);
        processChat(initialMessage, []);
    };

    const processChat = async (prompt: string, history: ChatMessage[]) => {
        if (!prompt.trim() || !moduleId) return;

        setLoadingAI(true);

        try {
            const contextHistory = history.map(m =>
                `${m.role === 'user' ? 'User' : 'AI'}: ${m.content}`
            ).join('\n');

            const finalPrompt = history.length > 0
                ? `Ini adalah kelanjutan percakapan kita:\n${contextHistory}\nUser baru saja bertanya: ${prompt}`
                : prompt;

            const response = await api.post('/api/ai/ask', {
                prompt: finalPrompt,
                moduleId: moduleId
            });

            const answer = response.data?.answer || response.data?.response || response.data;

            setMessages(prev => [...prev, {
                role: 'ai',
                content: typeof answer === 'string' ? answer : JSON.stringify(answer)
            }]);

        } catch (err) {
            setMessages(prev => [...prev, {
                role: 'ai',
                content: 'Maaf, Acel sedang gangguan koneksi. Coba tanya lagi ya!'
            }]);
        } finally {
            setLoadingAI(false);
        }
    };

    const handleSendMessage = () => {
        if (!inputValue.trim() || loadingAI) return;

        const newUserMsg = inputValue;
        setMessages(prev => [...prev, { role: 'user', content: newUserMsg }]);
        setInputValue('');

        processChat(newUserMsg, messages);
    };

    const scrollToBottom = () => {
        chatEnd.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleMarkComplete = async () => {
        if (!currentModule) return;
        setCompleting(true);
        try {
            await api.post(`/api/progress/module/${currentModule.id}/complete`);
            setCurrentModule({ ...currentModule, isCompleted: true });
            setAllModules(prev =>
                prev.map(m => m.id === currentModule.id ? { ...m, isCompleted: true } : m)
            );
        } catch (err) {
            console.error('Gagal menandai selesai:', err);
            alert('Gagal menyimpan progress.');
        } finally {
            setCompleting(false);
        }
    };

    const handleSelectModule = (module: Module) => {
        navigate(`/module/${module.id}`);
    };

    if (loading) return <div className="module-loading">Memuat modul...</div>;
    if (error) return <div className="module-error">{error}</div>;
    if (!currentModule) return <div className="module-error">Modul tidak ditemukan.</div>;

    return (
        <div className="module-layout">
            <aside className="module-sidebar">
                <h3>Daftar Modul</h3>
                <ul className="module-list">
                    {allModules.map((module) => (
                        <li
                            key={module.id}
                            className={`module-item ${module.id === currentModule.id ? 'active' : ''} ${module.isCompleted ? 'completed' : ''}`}
                            onClick={() => handleSelectModule(module)}
                        >
                            <span className="module-list">{module.title}</span>
                            {module.isCompleted && <span className="checkmark">✓</span>}
                        </li>
                    ))}
                </ul>
            </aside>
            <main className="module-content-area">
                <div className="module-header">
                    <button className="back-btn" onClick={() => navigate('/dashboard')}>
                        ← Dashboard
                    </button>
                    <button
                        className={`complete-btn ${currentModule.isCompleted ? 'completed' : ''}`}
                        onClick={handleMarkComplete}
                        disabled={completing || currentModule.isCompleted}
                    >
                        {currentModule.isCompleted ? 'Selesai' : 'Tandai Selesai'}
                    </button>
                </div>
                <h1 className="module-title">{currentModule.title}</h1>
                <div className="module-markdown" ref={contentRef}>
                    <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                        {currentModule.content}
                    </ReactMarkdown>
                </div>
            </main>

            { }
            {showPopup && (
                <button
                    ref={popupRef}
                    className="ask-ai-popup"
                    style={{ top: popupPosition.y, left: popupPosition.x }}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={handleAskAI}
                >
                    🤖 Ask Acel
                </button>
            )}

            { }
            {showAIModal && (
                <div className="ai-modal-overlay" onClick={() => setShowAIModal(false)}>
                    <div className="ai-modal-content chat-mode" onClick={(e) => e.stopPropagation()}>
                        <div className="ai-modal-header">
                            <h3>Tanya Acel</h3>
                            <button className="close-x" onClick={() => setShowAIModal(false)}>x</button>
                        </div>

                        <div className="chat-container">
                            {messages.map((msg, index) => (
                                <div key={index} className={`chat-bubble ${msg.role}`}>
                                    <strong>{msg.role === 'user' ? 'Kamu' : 'Acel'}:</strong>
                                    <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                                        {msg.content}
                                    </ReactMarkdown>
                                </div>
                            ))}
                            {loadingAI && <div className="chat-bubble ai loading">Acel sedang berpikir...</div>}
                            <div ref={chatEnd} />
                        </div>

                        <div className="chat-input-area">
                            <textarea
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Tanya balik ke Acel..."
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSendMessage();
                                    }
                                    else if (e.key === 'Escape'){
                                        e.preventDefault();
                                        setShowAIModal(false);
                                    }
                                }}
                            />
                            <button onClick={handleSendMessage} disabled={loadingAI}>
                                Kirim
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ModulePage;