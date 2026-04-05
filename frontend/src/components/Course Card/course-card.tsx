function Card(title: string, lesson: string, status: number) {
    return (
        <>
            <div className="course-card card-purple-border">
                <div className="course-card-icon math-icon"></div>
                <h3>{title}</h3>
                <p>Materi hari ini: {lesson}.</p>
                <div className="course-progress-bar">
                    <div className="progress-fill" style={{ width: '45%' }}></div>
                </div>
                <span className="course-status">{status}% Completed</span>
                <button className="btn-course-continue">Continue Lesson</button>
            </div>
        </>
    )
}

export default Card;