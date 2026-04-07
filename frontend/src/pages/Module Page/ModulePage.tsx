import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import api from '../../services/api';
import './ModulePage.css';

interface ModuleData {
    id: string;
    title: string;
    content: string;
    courseId: string;
    order: number;
}

function ModulePage() {
    const { moduleId } = useParams<{ moduleId: string }>();
    const navigate = useNavigate();
    const [module, setModule] = useState<ModuleData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchModule = async () => {
            if (!moduleId) {
                setError('Module ID tidak valid');
                setLoading(false);
                return;
            }
            try {
                const res = await api.get(`/api/learning/module/${moduleId}`);
                setModule(res.data);
            } catch (err) {
                console.error(err);
                setError('Gagal memuat modul.');
            } finally {
                setLoading(false);
            }
        };
        fetchModule();
    }, [moduleId]);

    if (loading) return <div className="module-loading">Memuat modul...</div>;
    if (error) return <div className="module-error">{error}</div>;
    if (!module) return <div className="module-error">Modul tidak ditemukan.</div>;

    return (
        <div className="module-container">
            <button className="module-back-btn" onClick={() => navigate(-1)}>
                ← Kembali ke Dashboard
            </button>
            <h1 className="module-title">{module.title}</h1>
            <div className="module-content">
                <ReactMarkdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                >
                    {module.content}
                </ReactMarkdown>
            </div>
        </div>
    );
}

export default ModulePage;