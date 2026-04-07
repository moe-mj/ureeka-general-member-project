import { useEffect, useState } from 'react';
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

function ModulePage() {
    const { moduleId } = useParams<{ moduleId: string }>();
    const navigate = useNavigate();
    const [currentModule, setCurrentModule] = useState<Module | null>(null);
    const [allModules, setAllModules] = useState<Module[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [completing, setCompleting] = useState(false);

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
                setCurrentModule(current);

                const modulesRes = await api.get(`/api/learning/${current.courseId}/modules`);
                let modules = modulesRes.data;

                // Ambil progress user untuk course ini
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
                } catch (err) {
                    console.warn('Progress API belum tersedia, lanjutkan tanpa status completed');
                }

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
                <div className="module-markdown">
                    <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                        {currentModule.content}
                    </ReactMarkdown>
                </div>
            </main>
        </div>
    );
}

export default ModulePage;